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
    const { method, type, url, appid, certid, operation, token, runame, options, items, offset } = props;
    this.props = {
      method:     method    ? R.toUpper(method) : 'GET'
    , type:       type      ? R.toUpper(type)   : 'JSON'
    , url:        url       ? url               : ''
    , appid:      appid     ? appid             : ''
    , certid:     certid    ? certid            : ''
    , operation:  operation ? operation         : ''
    , token:      token     ? token             : null
    , runame:     runame    ? runame            : null
    , options:    options   ? options           : null
    , items:      items     ? items             : null
    , offset:     offset    ? offset            : 0
    };
  }

  static of(props) {
    return new eBay(props);
  }

  fetch() {
    //log.trace(eBay.displayName, 'Props', this.props);
    const { operation, options, items } = this.props;
    log.info(eBay.displayName, 'Fetch', operation);
    switch(operation) {
      case 'GetItem':
        return this.fetchItemDetails(options, items);
      case 'inventory_item':
        return this.fetchInventoryItems(options);
      case 'client_credentials':
        return this.fetchToken(options);
      case 'code':
        return this.fetchCode(options);
      default:
        log.error(eBay.displayName, 'Error', 'Unknown operation.');
        return null;
    }
  }

  getCode() {
    const { method, type, url, appid, operation, runame } = this.props;
    const request = R.merge({ method, type, url }, this.optCode({ appid, operation, runame }));
    return net.fetch(request);
  }

  getToken() {
    //log.trace(eBay.displayName, 'getClientCredentialsGrant', options);
    const { method, type, url, appid, certid, operation, runame } = this.props;
    const request = R.merge({ method, type, url }, this.optToken({ appid, certid, operation, runame }));
    return net.fetch(request);
  }

  getItemDetail(item) {
    //log.trace(eBay.displayName, 'getItemDetail', options);
    const { method, type, url, appid, operation, token } = this.props;
    const request = R.merge({ method, type, url }, this.optDetail({ appid, operation, token }, item));
    return net.fetch(request);
  }

  getInventoryItems() {
    //log.trace(eBay.displayName, 'getInventoryItems', options);
    const { method, type, url, appid, operation, token, offset } = this.props;
    const request = R.merge({ method, type, url }, this.optInventory({ appid, operation, token, offset }));
    return net.fetch(request);
  }
  
  fetchCode(options) {
    const requestCode = from(this.getCode());
    return requestCode.pipe(
      map(R.tap(this.logTrace.bind(this)))
    , map(this.parseJSON)
    );
  }

  fetchToken(options) {
    const requestToken  = from(this.getToken());
    return requestToken.pipe(
      map(R.tap(this.logTrace.bind(this)))
    , map(this.parseJSON)
    );
  }

  fetchItemDetails(options, items) {
    //log.trace(eBay.displayName, 'fetchItemDetails', options, items);
    const promDetail  = R.map(obj => this.getItemDetail({ itemId: obj.itemId[0] }));
    const forkDetail  = objs => forkJoin(promDetail(objs));
    const promJSON    = R.map(obj => this.toJSON(obj));
    const forkJSON    = objs => forkJoin(promJSON(objs));
    const isDetail    = R.curry(this.filterDetail)(options);
    return forkDetail(items).pipe(
      flatMap(forkJSON)
    , map(R.map(this.resDetail.bind(this)))
    , map(R.map(this.setDetail.bind(this)))
    , map(R.filter(isDetail))
    , map(R.map(this.renderDetail.bind(this)))
    , map(R.map(this.toCSV.bind(this)))
    , map(R.join('\n'))
    );
  }

  fetchInventoryItems(options) {
    //log.trace(eBay.displayName, 'fetchInventoryItems', options);
    const observable = from(this.getInventoryItems());
    return observable.pipe(
      map(R.tap(this.logTrace.bind(this)))
    );
  }

  optToken(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const head = new Object();
    const auth = new Object();
    const search = new Object();
    head['Accept-Language'] = 'en-US';
    auth['user'] = _o.appid;
    auth['pass'] = _o.certid;
    search['grant_type'] = _o.operation;
    search['redirect_uri'] = _o.runame;
    search['scope'] = 'https://api.ebay.com/oauth/api_scope';
    return { head, auth, search, operation: _o.operation };
  }

  optInventory(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const head = new Object();
    const auth = new Object();
    const search = new Object();
    //head['Accept-Encoding'] = 'application/gzip';
    head['Accept-Language'] = 'en-US';
    head['X-EBAY-C-MARKETPLACE-ID'] = 'EBAY_US';
    auth['bearer'] = _o.token;
    search['limit'] = 100;
    search['offset'] = _o.offset;
    return { head, auth, search, operation: _o.operation };
  }

  optDetail(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const head = new Object();
    const body = new Object();
    head['Accept-Language'] = 'en-US';
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
    //log.trace(eBay.displayName, 'optDetail:', head, body);
    return { head, body: this.toXML(_o.operation, body) };
  }

  resDetail(obj) {
    return obj.hasOwnProperty('GetItemResponse') 
      ? obj.GetItemResponse : null;
  }
  
  setDetail(obj) {
    return obj && obj.Ack === 'Success'
      ? obj.Item : null;
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

  //renderItem(item, idx) {
  //  const Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
  //  const Aid = item.itemId[0];
  //  const Pid = item.hasOwnProperty('productId')
  //    ? item.productId.map(obj => `${obj.__value__} ( ${obj['@type']} )`) : ['---'];
  //  const Sid = item.sellerInfo[0].sellerUserName[0];
  //  const Stm = std.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
  //  const Etm = std.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
  //  const Url = item.viewItemURL[0];
  //  const Ttl = item.title[0];
  //  const Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
  //  const Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
  //  const Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
  //  const Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
  //  const Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
  //  const Cgp = item.primaryCategory[0].categoryName[0];
  //  const Shp = item.shippingInfo[0].shipToLocations[0];
  //  const Stt = item.sellingStatus[0].sellingState[0];
  //  const Ext = item.sellingStatus[0].hasOwnProperty('timeLeft')
  //    ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
  //  const stt = this.renderStatus(0);
  //  const Upd = std.getLocalTimeStamp(Date.now());
  //  return {
  //    'Key':              idx
  //  , 'Image':            Img
  //  , 'Url':              Url
  //  , 'Title':            Ttl
  //  , 'Sell Start':       Stm
  //  , 'Sell Stop':        Etm
  //  , 'Condition':        Cdn
  //  , 'Seller':           Sid
  //  , 'ItemID':           Aid
  //  , 'ProductID':        Pid.join('/')
  //  , 'Category':         Cgp
  //  , 'Shipping':         Shp
  //  , 'Price':            Pc1
  //  , 'Currency':         Ci1
  //  , 'Convert Price':    Pc2
  //  , 'Convert Currency': Ci2
  //  , 'Status':           Stt
  //  , 'Extention':        Ext
  //  , 'Avail':            stt
  //  , 'Updated':          Upd
  //  };
  //}

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
    const Ext = item.hasOwnProperty('TimeLeft') ? '"' + this.renderExtension(item.TimeLeft) + '"' : '';
    return {
      'Image':              Img
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

  //filterItem(options, obj) {
  //  const item = obj;
  //  if(options != null) {
  //    if(!options.shipping.some(shipping => shipping === item.shippingInfo[0].shipToLocations[0])
  //      && options.shipping.length) return false;
  //    if(!options.condition.some(condition => condition === item.condition[0].conditionId[0])
  //      && options.condition.length) return false;
  //    if(!options.status.some(status => status === item.sellingStatus[0].sellingState[0])
  //      && options.status.length) return false;
  //    if(!options.categoryPath.some(path => path === item.primaryCategory[0].categoryName[0])
  //      && options.categoryPath.length) return false;
  //    if(!options.seller.some(selr => selr === item.sellerInfo[0].sellerUserName[0])
  //      && options.seller.length) return false;
  //    if(!options.itemId.some(itemid => itemid === item.itemId[0]) && options.itemId.length) return false;
  //    if(!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
  //    if(Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ 
  //      && options.lowestPrice !== '') return false;
  //    if(Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ 
  //      && options.highestPrice !== '') return false;
  //  }
  //  return true;
  //}

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
    return R.join(',', arr);
  }

  toXML(req, obj) {
    let xml = new Object();
    xml[req] = obj;
    return builder.create(xml, { encoding: 'utf-8' }).end();
  }

  toJSON(str) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(str, { attrkey: 'root', charkey: 'sub', trim: true, explicitArray: false }
      , (err, res) => {
        if(err) return reject(err);
        resolve(res)
      });
    });
  }

  toLeftDays(date) {
    const obj = parse(date);
    return (`${obj.days} days / ${obj.hours} hours / ${obj.minutes} minutes`);
  }

  parseJSON(str) {
    return JSON.parse(str);
  }

  logTrace(message) {
    return log.trace(eBay.displayName, message);
  }

  logError(error) {
    return log.error(eBay.displayName, error);
  }
};
eBay.displayName = 'ebay-api';
export default eBay;
