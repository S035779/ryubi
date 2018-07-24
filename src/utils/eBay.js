import * as R                   from 'ramda';
import { from, forkJoin, pipe } from 'rxjs';
import { map, flatMap }         from 'rxjs/operators';
import xml2js                   from 'xml2js';
import builder                  from 'xmlbuilder';
import { parse }                from 'iso8601-duration';
import std                      from 'Utilities/stdutils';
import net                      from 'Utilities/netutils';
import log                      from 'Utilities/logutils';

/** 
 * eBay Api Client class.
 *
 * @constructor
 * @params { string } appid - application name.
 * @params { string } token - application token.
 */
class eBay {
  constructor(props) {
    if(!props) return log.error(eBay.displayName, 'Error', 'Request failed.');
    const { url, method, appid, token, page, operation, type, options } = props;
    this.props = {
      url:        url       ? url               : ''
    , method:     method    ? R.toUpper(method) : 'GET'
    , appid:      appid     ? appid             : ''
    , token:      token     ? token             : null
    , page:       page      ? page              : 1
    , operation:  operation ? operation         : ''
    , type:       type      ? R.toUpper(type)   : 'JSON'
    , options:    options   ? options           : null
    };
  }

  static of(props) {
    return new eBay(props);
  }

  request(operation, options) {
    log.info(eBay.displayName, 'Request', operation);
    log.trace(eBay.displayName, 'Options', options);
    switch(operation) {
      case 'GetItem':
        return new Promise((resolve, reject) => {
          net.fetch(options, (error, header, body) => {
            if(error) return reject(error);
            log.trace(eBay.displayName, 'GetItem', body);
            resolve(body);
          });
        });
      case 'getInventoryItems':
        return new Promise((resolve, reject) => {
          net.fetch(options, (error, header, body) => {
            if(error) return reject(error);
            log.trace(eBay.displayName, 'getInventoryItems', body);
            resolve(body);
          });
        });
      default:
        log.error(eBay.displayName, 'Error', 'Unknown operation.');
        return null;
    }
  }

  getInventoryItems(options, page) {
    const { appid, operation, type, url } = this.props;
    return this.request('getInventoryItems'
      , this.optInventory({ appid, page, operation, type, url }, options));
  }
  
  getItemDetail(options) {
    log.trace(eBay.displayName, 'getItemDetail', options);
    const { appid, token, operation, type, url } = this.props;
    return this.request('GetItem', this.optDetail({ appid, token, operation, type, url }, options));
  }

  fetchItemDetails(options) {
    const Items        = objs => from(options);
    const streamDetail = obj  => this.getItemDetail({ itemId: obj.itemId[0] });
    const forkJSON     = obj  => forkJoin(this.toJSON(obj));
    return Items(options)
      .pipe(
        flatMap(streamDetail)
      , map(R.tap(this.logTrace.bind(this)))
      , flatMap(forkJSON)
      , map(R.map(this.resDetail.bind(this)))
      , map(R.map(this.setDetail.bind(this)))
      , map(R.filter(R.curry(this.filterDetail.bind(this))(options)))
      , map(R.map(this.renderDetail.bind(this)))
      , map(R.map(this.toCSV.bind(this)))
      , map(R.map(csv => csv + '\n'))
      )
    ;
  }

  fetch() {
    const { operation, options, page } = this.props;
    log.info(eBay.displayName, 'Fetch', operation);
    //log.trace(eBay.displayName, 'Props', this.props);
    switch(operation) {
      case 'GetItem':
        return this.fetchItemDetails(options);
      case 'getInventoryItems':
        return this.fetchInventoryItems(options, page);
      default:
        log.error(eBay.displayName, 'Error', 'Unknown operation.');
        return null;
    }
  }

  forInventoryItems(options, res) {
    const pages = Number(options.pages);
    const page = Number(res.paginationOutput[0].totalPages[0]) < pages
      ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    const newItems = [];
    for(let idx=1; idx <= page; idx++) {
      newItems.push(this.getProductsItems(options, idx));
    }
    return newItems;
  }
  
  resInventoryItems(obj) {
    return obj.hasOwnProperty('inventoryItems') 
      ? obj.inventoryItems : null;
  }
  
  resDetail(obj) {
    return obj.hasOwnProperty('GetItemResponse') 
      ? obj.GetItemResponse : null;
  }
  
  setDetail(obj) {
    return obj && obj.Ack === 'Success'
      ? obj.Item : null;
  }

  optInventory(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const head = new Object();
    const auth = new Object();
    const query = new Object();
    head['Accept-Encoding'] = 'application/gzip';
    head['Accept-Language'] = 'en-US';
    head['X-EBAY-C-MARKETPLACE-ID'] = 'EBAY_US';
    auth['bearer'] = _o.token;
    query['limit'] = 100;
    query['offert'] = _o.page;
    return { head, auth, query, operation: _o.operation };
  }

  optDetail(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const head = new Object();
    const body = new Object();
    head['X-EBAY-API-COMPATIBILITY-LEVEL'] = '967';
    head['X-EBAY-API-APP-NAME'] = _o.appid;
    head['X-EBAY-API-CALL-NAME'] = o.operation;
    head['X-EBAY-API-SITEID'] = 0;
    body['@xmlns'] = 'urn:ebay:apis:eBLBaseComponents';
    body['RequesterCredentials'] = { 'eBayAuthToken': _o.token };
    body['ErrorLanguage'] = 'en_US';
    body['WarningLevel'] = 'High';
    body['ItemID'] = _p.itemId;
    body['DetailLevel'] = 'ReturnAll';
    log.trace(eBay.displayName, 'optDetail:', head, body);
    return { head, body: this.toXML(_o.operation, body) };
  }

  renderStatus(status) {
    switch(status) {
      case 0:
        return 'Now available.';
      case 1:
        return 'New added.';
      case 2:
        return 'Removed.';
    }
  }

  renderExtension(duration) {
    return this.toLeftDays(duration);
  }

  renderItem(item, idx) {
    const Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
    const Aid = item.itemId[0];
    const Pid = item.hasOwnProperty('productId')
      ? item.productId.map(obj => `${obj.__value__} ( ${obj['@type']} )`) : ['---'];
    const Sid = item.sellerInfo[0].sellerUserName[0];
    const Stm = std.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
    const Etm = std.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
    const Url = item.viewItemURL[0];
    const Ttl = item.title[0];
    const Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
    const Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
    const Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
    const Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
    const Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
    const Cgp = item.primaryCategory[0].categoryName[0];
    const Shp = item.shippingInfo[0].shipToLocations[0];
    const Stt = item.sellingStatus[0].sellingState[0];
    const Ext = item.sellingStatus[0].hasOwnProperty('timeLeft')
      ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
    const stt = this.renderStatus(0);
    const Upd = std.getLocalTimeStamp(Date.now());
    return {
      'Key':                idx
      , 'Image':            Img
      , 'Url':              Url
      , 'Title':            Ttl
      , 'Sell Start':       Stm
      , 'Sell Stop':        Etm
      , 'Condition':        Cdn
      , 'Seller':           Sid
      , 'ItemID':           Aid
      , 'ProductID':        Pid.join('/')
      , 'Category':         Cgp
      , 'Shipping':         Shp
      , 'Price':            Pc1
      , 'Currency':         Ci1
      , 'Convert Price':    Pc2
      , 'Convert Currency': Ci2
      , 'Status':           Stt
      , 'Extention':        Ext
      , 'Avail':            stt
      , 'Updated':          Upd
    };
  }

  renderDetail(item) {
    const Img = item.hasOwnProperty('PictureDetails') ? '"' + item.PictureDetails.GalleryURL + '"' : '';
    const Url = '"' + item.ListingDetails.ViewItemURL + '"';
    const Ttl = '"' + item.Title + '"';
    const Aid = item.ItemID;
    let UPC   = '';
    let EAN   = '';
    let ISBN  = '';
    if(item.hasOwnProperty('ProductListingDetails')) {
      const pdf = item.ProductListingDetails;
      UPC  = pdf.hasOwnProperty('UPC')  ? pdf.UPC  : '';
      EAN  = pdf.hasOwnProperty('EAN')  ? pdf.EAN  : '';
      ISBN = pdf.hasOwnProperty('ISBN') ? pdf.ISBN : '';
    }
    const Sid = item.Seller.UserID;
    const Stm = std.getLocalTimeStamp(item.ListingDetails.StartTime);
    const Etm = std.getLocalTimeStamp(item.ListingDetails.EndTime);
    const Pc1 = item.SellingStatus.CurrentPrice.sub;
    const Ci1 = item.SellingStatus.CurrentPrice.root.currencyID;
    const Pc2 = item.ListingDetails.ConvertedStartPrice.sub;
    const Ci2 = item.ListingDetails.ConvertedStartPrice.root.currencyID;
    const Cdn = item.ConditionDisplayName;
    const Cgp = '"' + item.PrimaryCategory.CategoryName + '"';
    const Shp = Array.isArray(item.ShipToLocations) ? item.ShipToLocations : [ item.ShipToLocations ];
    const Stt = item.SellingStatus.ListingStatus;
    const Ext = item.hasOwnProperty('TimeLeft') ? this.renderExtension(item.TimeLeft) : '';
    return {
      'Image':                Img
      , 'Url':                Url
      , 'Title':              Ttl
      , 'StartTime':          Stm
      , 'EndTime':            Etm
      , 'Condition':          Cdn
      , 'Seller':             Sid
      , 'ItemID':             Aid
      , 'ProductID(UPC)':     UPC
      , 'ProductID(EAN)':     EAN
      , 'ProductID(ISBN)':    ISBN
      , 'Category':           Cgp
      , 'Shipping':           Shp.join('/')
      , 'CurrentPrice':       Pc1
      , 'CurrentCurrency':    Ci1
      , 'ConvertedPrice':     Pc2
      , 'ConvertedCurrency':  Ci2
      , 'Status':             Stt
      , 'LeftTime':           Ext
    };
  }

  filterItem(options, obj) {
    const item = obj;
    if(options != null) {
      if(!options.shipping.some(shipping => shipping === item.shippingInfo[0].shipToLocations[0])
        && options.shipping.length) return false;
      if(!options.condition.some(condition => condition === item.condition[0].conditionId[0])
        && options.condition.length) return false;
      if(!options.status.some(status => status === item.sellingStatus[0].sellingState[0])
        && options.status.length) return false;
      if(!options.categoryPath.some(path => path === item.primaryCategory[0].categoryName[0])
        && options.categoryPath.length) return false;
      if(!options.seller.some(selr => selr === item.sellerInfo[0].sellerUserName[0])
        && options.seller.length) return false;
      if(!options.itemId.some(itemid => itemid === item.itemId[0]) && options.itemId.length) return false;
      if(!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
      if(Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ 
        && options.lowestPrice !== '') return false;
      if(Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ 
        && options.highestPrice !== '') return false;
    }
    return true;
  }

  filterDetail(options, obj) {
    const item = obj;
    if(options != null) {
      if(!options.shipping.some(shipping => shipping === item.ShipToLocations) && options.shipping.length) 
        return false;
      if(!options.condition.some(condition => condition === item.ConditionID) && options.condition.length)
        return false;
      if(!options.status.some(status => status === item.SellingStatus.ListingStatus) && options.status.length)
        return false;
      if(!options.categoryPath.some(path => path === item.PrimaryCategory.CategoryName)
        && options.categoryPath.length) return false;
      if(!options.seller.some(selr => selr === item.Seller.UserID) && options.seller.length) return false;
      if(!options.itemId.some(itemid => itemid === item.ItemID) && options.itemId.length) return false;
      if(!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
      if(Number(options.lowestPrice) > item.SellingStatus.ConvertedCurrentPrice.sub 
        && options.lowestPrice !== '') return false;
      if(Number(options.highestPrice) < item.SellingStatus.ConvertedCurrentPrice.sub 
        && options.highestPrice !== '') return false;
    }
    return true;
  }

  toCSV(obj) {
    let arr = new Array();
    for(let prop in obj) arr.push(obj[prop]);
    return arr.join();
  }

  toXML(req, obj) {
    let xml = new Object();
    xml[req] = obj;
    return builder.create(xml, { encoding: 'utf-8' }).end();
  }

  toJSON(str) {
    return new Promise(resolve => {
      xml2js.parseString(str, { attrkey: 'root', charkey: 'sub', trim: true, explicitArray: false }
      , (err, res) => {
        if(err) return this.logError(err);
        resolve(res)
      });
    });
  }

  toLeftDays(date) {
    const obj = parse(date);
    return (`${obj.days} days / ${obj.hours} hours / ${obj.minutes} minutes`);
  }

  logTrace(obj) {
    return log.trace(eBay.displayName, 'Trace', obj);
  }

  logError(err) {
    return log.error(eBay.displayName, err.name, err.message);
  }
};
eBay.displayName = 'ebay-api';
export default eBay;
