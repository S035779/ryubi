import * as R                       from 'ramda';
import { from, forkJoin, pipe }     from 'rxjs';
import { map, flatMap }             from 'rxjs/operators';
import { M, log, spn, stor, util }  from 'Utilities/webutils';
import std                          from 'Utilities/stdutils';
import { fetch }                    from 'Utilities/ipcutils';

log.config('console', 'basic', 'ALL', 'electron-renderer');
spn.config('app');

const displayName = `NoteApiClient`;

let eBay = new Object();
export default {
  request(action, response) {
    log.info(displayName, 'request', action);
    switch(action) {
      case 'config/fetch':
        return new Promise((resolve, reject) => {
          const memory = window.localStorage 
            || (window.UserDataStorage && new stor.UserDataStorage()) || new stor.CookieStorage();
          const config = JSON.parse(memory.getItem("eBay_config"));
          eBay = config ? config : {};
          resolve(eBay);
        });
      case 'config/write':
        return new Promise((resolve, reject) => {
          const memory = window.localStorage
            || (window.UserDataStorage && new stor.UserDataStorage()) || new stor.CookieStorage();
          eBay = response;
          memory.setItem("eBay_config", JSON.stringify(response));
          resolve(response);
        });
      case 'findItemsByKeywords':
        return new Promise((resolve, reject) => {
          JSONP.request(eBay.findingApi, response, obj => {
            resolve(obj);
          });
        });
      case 'findCompletedItems':
        return new Promise((resolve, reject) => {
          JSONP.request(eBay.findingApi, response, obj => {
            resolve(obj);
          });
        });
      case 'findItemsByProduct':
        return new Promise((resolve, reject) => {
          JSONP.request(eBay.findingApi, response, obj => {
            resolve(obj);
          });
        });
      case 'findItemDetails':
        return new Promise((resolve, reject) => {
          fetch.of(eBay.tradingApi).postXML(response, (err, obj) => {
            if(err) return reject(err);
            resolve(obj);
          });
        });
      case 'getInventoryItems':
        return new Promise((resolve, reject) => {
          fetch.of(eBay.inventoryApi + response.operation).getJSON(response, (err, obj) => {
            if(err) return reject(err);
            resolve(obj);
          });
        });
      default:
        return new Promise(resolve => {
          log.error(displayName, 'request', 'unknown!!');
          resolve(response);
        });
    }
  },

  getConfig() {
    return this.request('config/fetch');
  },

  getItems(options, page) {
    return this.request('findItemsByKeywords'
      , this.optItems({ appid: eBay.appid, page, operation: 'findItemsByKeywords' }, options));
  },
  
  getCompleteItems(options, page) {
    return this.request('findCompletedItems'
      , this.optItems({ appid: eBay.appid, page, operation: 'findCompletedItems' }, options));
  },
  
  getProductsItems(options, page) {
    return this.request('findItemsByProduct'
      , this.optProducts({ appid: eBay.appid, page, operation: 'findItemsByProduct' }, options));
  },
  
  getInventoryItems(options, page) {
    return this.request('getInventoryItems'
      , this.optInventory({ appid: eBay.appid, page, operation: '/inventory_item' }, options));
  },
  
  getDetail(options) {
    return this.request('findItemDetails'
      , this.optDetail({ appid:  eBay.appid, token:  eBay.token, operation: 'GetItem' }, options));
  },

  putConfig(config) {
    return this.request('config/write', config);
  },

  putItems(items) {
    return this.request('writeItemsByKeywords', items);
  },
  
  putCompleteItems(items) {
    return this.request('writeCompletedItems', items);
  },
  
  putProductsItems(items) {
    return this.request('writeItemsByProduct', items);
  },
  
  fetchItems(options, page) {
    //log.trace(`${pspid}>`,'options:', options);
    //log.trace(`${pspid}>`,'page:', page);
    return this.getItems(options, page)
      .then(this.resItems)
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  
  fetchCompleteItems(options, page) {
    //log.trace(`${pspid}>`,'options:', options);
    //log.trace(`${pspid}>`,'page:', page);
    return this.getCompleteItems(options, page)
      .then(this.resCompleteItems)
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  
  fetchProductsItems(options, page) {
    //log.trace(`${pspid}>`,'options:', options);
    //log.trace(`${pspid}>`,'page:', page);
    return this.getProductsItems(options, page)
      .then(this.resProductsItems)
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  
  writeItems(options) {
    //log.trace(`${pspid}>`,'options:', options);
    //const pages = Number(options.pages);
    const streamItems   = idx => from(this.getItems(options, idx));
    const streamDetail  = obj => from(this.getDetail({ itemId: obj.itemId }));
    const forkItems     = obj => forkJoin(this.forItems(options, obj));
    const forkJSON      = obj => forkJoin(util.toJSON(obj));
    return streamItems(1)
      .pipe(
        map(this.resItems)
      , flatMap(forkItems)
      , map(R.map(this.resItems.bind(this)))
      , map(R.map(this.setItems.bind(this)))
      , map(R.flatten)
      , flatMap(from)
      , flatMap(streamDetail)
      , map(R.tap(this.traceLog.bind(this)))
      , flatMap(forkJSON)
      , map(R.map(this.resDetail.bind(this)))
      , map(R.map(this.setDetail.bind(this)))
      , map(R.filter(R.curry(this.filterDetail.bind(this))(options)))
      , map(R.map(this.renderDetail.bind(this)))
      , map(R.map(util.toCSV.bind(this)))
      , map(R.map(csv => csv + '\n'))
      )
    ;
  },

  writeCompleteItems(options) {
    //log.trace(`${pspid}>`,'options:', options);
    //const pages = Number(options.pages);
    const streamItems   = idx => from(this.getCompleteItems(options, idx));
    const streamDetail  = obj => from(this.getDetail({ itemId: obj.itemId }));
    const forkItems     = obj => forkJoin(this.forCompleteItems(options, obj));
    const forkJSON      = obj => forkJoin(util.toJSON(obj));
    return streamItems(1)
      .pipe(
        map(this.resCompleteItems)
      , flatMap(forkItems)
      , map(R.map(this.resCompleteItems.bind(this)))
      , map(R.map(this.setItems.bind(this)))
      , map(R.flatten)
      , flatMap(from)
      , flatMap(streamDetail)
      , flatMap(forkJSON)
      , map(R.map(this.resDetail.bind(this)))
      , map(R.map(this.setDetail.bind(this)))
      , map(R.filter(R.curry(this.filterDetail.bind(this))(options)))
      , map(R.map(this.renderDetail.bind(this)))
      , map(R.map(util.toCSV.bind(this)))
      , map(R.map(csv => csv + '\n'))
      )
    ;
  },
  
  writeProductsItems(options) {
    //log.trace(`${pspid}>`,'options:', options);
    //const pages = Number(options.pages);
    const streamItems   = idx => from(this.getProductsItems(options, idx));
    const streamDetail  = obj => from(this.getDetail({ itemId: obj.itemId }));
    const forkItems     = obj => forkJoin(this.forProductsItems(options, obj));
    const forkJSON      = obj => forkJoin(util.toJSON(obj));
    return streamItems(1)
      .pipe(
        map(this.resProductsItems)
      , flatMap(forkItems)
      , map(R.map(this.resProductsItems.bind(this)))
      , map(R.map(this.setItems.bind(this)))
      , map(R.flatten)
      , flatMap(from)
      , flatMap(streamDetail)
      , flatMap(forkJSON)
      , map(R.map(this.resDetail.bind(this)))
      , map(R.map(this.setDetail.bind(this)))
      , map(R.filter(R.curry(this.filterDetail.bind(this))(options)))
      , map(R.map(this.renderDetail.bind(this)))
      , map(R.map(util.toCSV.bind(this)))
      , map(R.map(csv => csv + '\n'))
      )
    ;
  },
  
  writeInventoryItems(options) {
    //log.trace(`${pspid}>`,'options:', options);
    //const pages = Number(options.pages);
    const streamItems   = idx => from(this.getInventoryItems(options, idx));
    const streamDetail  = obj => from(this.getDetail({ itemId: obj.itemId }));
    const forkItems     = obj => forkJoin(this.forInventoryItems(options, obj));
    const forkJSON      = obj => forkJoin(util.toJSON(obj));
    return streamItems(1)
      .pipe(
        map(this.resInventoryItems)
      , flatMap(forkItems)
      , map(R.map(this.resInventoryItems.bind(this)))
      , map(R.map(this.setItems.bind(this)))
      , map(R.flatten)
      , flatMap(from)
      , flatMap(streamDetail)
      , flatMap(forkJSON)
      , map(R.map(this.resDetail.bind(this)))
      , map(R.map(this.setDetail.bind(this)))
      , map(R.filter(R.curry(this.filterDetail.bind(this))(options)))
      , map(R.map(this.renderDetail.bind(this)))
      , map(R.map(util.toCSV.bind(this)))
      , map(R.map(csv => csv + '\n'))
      )
    ;
  },
  
  forItems(options, res) {
    const pages = Number(options.pages);
    const page = Number(res.paginationOutput[0].totalPages[0]) < pages
      ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    const newItems = [];
    for(let idx=1; idx <= page; idx++) {
      newItems.push(this.getItems(options, idx));
    }
    return newItems;
  },
  
  forCompleteItems(options, res) {
    const pages = Number(options.pages);
    const page = Number(res.paginationOutput[0].totalPages[0]) < pages
      ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    const newItems = [];
    for(let idx=1; idx <= page; idx++) {
      newItems.push(this.getCompleteItems(options, idx));
    }
    return newItems;
  },
  
  forProductsItems(options, res) {
    const pages = Number(options.pages);
    const page = Number(res.paginationOutput[0].totalPages[0]) < pages
      ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    const newItems = [];
    for(let idx=1; idx <= page; idx++) {
      newItems.push(this.getProductsItems(options, idx));
    }
    return newItems;
  },
  
  forInventoryItems(options, res) {
    const pages = Number(options.pages);
    const page = Number(res.paginationOutput[0].totalPages[0]) < pages
      ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    const newItems = [];
    for(let idx=1; idx <= page; idx++) {
      newItems.push(this.getProductsItems(options, idx));
    }
    return newItems;
  },
  
  resItems(obj) {
    return obj.hasOwnProperty('findItemsByKeywordsResponse') 
      ? obj.findItemsByKeywordsResponse[0] : null;
  },
  
  resCompleteItems(obj) {
    return obj.hasOwnProperty('findCompletedItemsResponse') 
      ? obj.findCompletedItemsResponse[0] : null;
  },
  
  resProductsItems(obj) {
    return obj.hasOwnProperty('findItemsByProductResponse') 
      ? obj.findItemsByProductResponse[0] : null;
  },
  
  resInventoryItems(obj) {
    return obj.hasOwnProperty('inventoryItems') 
      ? obj.inventoryItems : null;
  },
  
  resDetail(obj) {
    return obj.hasOwnProperty('GetItemResponse') 
      ? obj.GetItemResponse : null;
  },
  
  setItems(obj) {
    return  obj && obj.ack[0] === 'Success'
      ? obj.searchResult[0].item : null;
  },

  setDetail(obj) {
    return obj && obj.Ack === 'Success'
      ? obj.Item : null;
  },

  optItems(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const options = new Object();
    options['GLOBAL-ID'] = 'EBAY-US';
    options['MESSAGE-ENCODING'] = 'UTF-8';
    options['OPERATION-NAME'] = _o.operation;
    options['REQUEST-DATA-FORMAT'] = 'NV';
    options['RESPONSE-DATA-FORMAT'] = 'JSON';
    options['REST-PAYLOAD'] = '';
    options['SECURITY-APPNAME'] = _o.appid;
    options['SERVICE-VERSION'] = '1.13.0';
    options['outputSelector'] = 'SellerInfo';
    options['paginationInput.entriesPerPage'] = 100;
    options['paginationInput.pageNumber'] = _o.page;

    if(_p.searchString) {
      options['keywords'] = _p.searchString;
    } else {
      options['keywords'] = '';
    }

    let n = 0;
    if(_p.seller && _p.seller.length) {
      options['itemFilter(' +n+ ').name'] = 'Seller';
      _p.seller.forEach((slr, idx) =>
        options['itemFilter(' +n+ ').value(' +idx+ ')'] = slr);
      n++;
    }

    if(_p.highestPrice) {
      options['itemFilter(' +n+ ').name'] = 'MaxPrice';
      options['itemFilter(' +n+ ').value(0)']
        = _p.highestPrice;
      n++;
    }

    if(_p.lowestPrice) {
      options['itemFilter(' +n+ ').name'] = 'MinPrice';
      options['itemFilter(' +n+ ').value(0)'] = _p.lowestPrice;
      n++;
    }
    
    if(_p.condition && _p.condition.length) {
      options['itemFilter(' +n+ ').name'] = 'Condition';
      _p.condition.forEach((cdn, idx) => 
        options['itemFilter(' +n+ ').value(' +idx+ ')'] = cdn);
      n++;
    }

    if(_p.soldItemOnly === true) {
      options['itemFilter(' +n+ ').name'] = 'SoldItemOnly';
      options['itemFilter(' +n+ ').value(0)'] = 'true';
      n++;
    }
    
    if(std.isValidDate(_p.startDate)) {
      options['itemFilter(' +n+ ').name'] = 'EndTimeFrom';
      options['itemFilter(' +n+ ').value(0)']
        = std.setTimeStamp(_p.startDate);
      n++;
    }

    if(std.isValidDate(_p.endDate)) {
      options['itemFilter(' +n+ ').name'] = 'EndTimeTo';
      options['itemFilter(' +n+ ').value(0)']
        = std.setTimeStamp(_p.endDate);
      n++;
    }
    
    //log.trace(`${pspid}>`, 'optItems:', options);
    return options;
  },

  optProducts(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const options = new Object();
    options['GLOBAL-ID'] = 'EBAY-US';
    options['MESSAGE-ENCODING'] = 'UTF-8';
    options['OPERATION-NAME'] = _o.operation;
    options['REQUEST-DATA-FORMAT'] = 'NV';
    options['RESPONSE-DATA-FORMAT'] = 'JSON';
    options['REST-PAYLOAD'] = '';
    options['SECURITY-APPNAME'] = _o.appid;
    options['SERVICE-VERSION'] = '1.13.0';
    options['outputSelector'] = 'SellerInfo';
    options['paginationInput.entriesPerPage'] = 100;
    options['paginationInput.pageNumber'] = _o.page;

    if(_p.productId && _p.productType) {
      options['productId'] = _p.productId;
      options['productId.@type'] = _p.productType;
    } else {
      options['productId'] = '';
      options['productId.@type'] = '';
    }

    let n = 0;
    if(_p.seller && _p.seller.length) {
      options['itemFilter(' +n+ ').name'] = 'Seller';
      _p.seller.forEach((slr, idx) =>
        options['itemFilter(' +n+ ').value(' +idx+ ')'] = slr);
      n++;
    }

    if(_p.highestPrice) {
      options['itemFilter(' +n+ ').name'] = 'MaxPrice';
      options['itemFilter(' +n+ ').value(0)']
        = _p.highestPrice;
      n++;
    }

    if(_p.lowestPrice) {
      options['itemFilter(' +n+ ').name'] = 'MinPrice';
      options['itemFilter(' +n+ ').value(0)'] = _p.lowestPrice;
      n++;
    }
    
    if(_p.condition && _p.condition.length) {
      options['itemFilter(' +n+ ').name'] = 'Condition';
      _p.condition.forEach((cdn, idx) => 
        options['itemFilter(' +n+ ').value(' +idx+ ')'] = cdn);
      n++;
    }

    //log.trace(`${pspid}>`, 'optProducts:', options);
    return options;
  },

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
  },

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
    //log.trace(`${pspid}>`, 'optDetail:', head, body);
    return { head, body: util.toXML(_o.operation, body) };
  },

  renderStatus(status) {
    switch(status) {
      case 0:
        return 'Now available.';
      case 1:
        return 'New added.';
      case 2:
        return 'Removed.';
    }
  },

  renderExtension(duration) {
    return util.toLeftDays(duration);
  },

  renderItem(item, idx) {
    const Img = item.hasOwnProperty('galleryURL')
      ? item.galleryURL[0] : '';
    const Aid = item.itemId[0];
    const Pid = item.hasOwnProperty('productId')
      ? item.productId.map(obj =>
        `${obj.__value__} ( ${obj['@type']} )`) : ['---'];
    const Sid = item.sellerInfo[0].sellerUserName[0];
    const Stm
      = std.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
    const Etm
      = std.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
    const Url = item.viewItemURL[0];
    const Ttl = item.title[0];
    const Pc1 = item.sellingStatus[0]
      .currentPrice[0].__value__;
    const Ci1 = item.sellingStatus[0]
      .currentPrice[0]['@currencyId'];
    const Pc2 = item.sellingStatus[0]
      .convertedCurrentPrice[0].__value__;
    const Ci2 = item.sellingStatus[0]
      .convertedCurrentPrice[0]['@currencyId'];
    const Cdn = item.hasOwnProperty('condition') 
      ? item.condition[0].conditionDisplayName[0] : '---';
    const Cgp = item.primaryCategory[0].categoryName[0];
    const Shp = item.shippingInfo[0].shipToLocations[0];
    const Stt = item.sellingStatus[0].sellingState[0];
    const Ext = item.sellingStatus[0].hasOwnProperty('timeLeft')
      ? this.renderExtension(item.sellingStatus[0].timeLeft[0])
      : '';
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
  },

  renderDetail(item) {
    const Img = item.hasOwnProperty('PictureDetails')
      ? '"' + item.PictureDetails.GalleryURL + '"' : '';
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
    const Stm
      = std.getLocalTimeStamp(item.ListingDetails.StartTime);
    const Etm
      = std.getLocalTimeStamp(item.ListingDetails.EndTime);
    const Pc1 = item.SellingStatus
      .CurrentPrice.sub;
    const Ci1 = item.SellingStatus
      .CurrentPrice.root.currencyID;
    const Pc2 = item.ListingDetails
      .ConvertedStartPrice.sub;
    const Ci2 = item.ListingDetails
      .ConvertedStartPrice.root.currencyID;
    const Cdn = item.ConditionDisplayName;
    const Cgp = '"' + item.PrimaryCategory.CategoryName + '"';
    const Shp = Array.isArray(item.ShipToLocations)
      ? item.ShipToLocations : [ item.ShipToLocations ];
    const Stt = item.SellingStatus.ListingStatus;
    const Ext = item.hasOwnProperty('TimeLeft')
      ? this.renderExtension(item.TimeLeft) : '';
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
  },

  filterItem(options, obj) {
    const item = obj;
    if(options != null) {
      if(!options.shipping.some(shipping =>
        shipping === item.shippingInfo[0]
        .shipToLocations[0])
        && options.shipping.length)
        return false;
      if(!options.condition.some(condition => 
        condition === item.condition[0]
        .conditionId[0])
        && options.condition.length)
        return false;
      if(!options.status.some(status =>
        status === item.sellingStatus[0]
        .sellingState[0])
        && options.status.length)
        return false;
      if(!options.categoryPath.some(path =>
        path === item.primaryCategory[0]
        .categoryName[0])
        && options.categoryPath.length)
        return false;
      if(!options.seller.some(selr => 
        selr === item.sellerInfo[0]
        .sellerUserName[0])
        && options.seller.length)
        return false;
      if(!options.itemId.some(itemid => 
        itemid === item.itemId[0])
        && options.itemId.length)
        return false;
      if(!isFinite(options.lowestPrice) 
        || !isFinite(options.highestPrice))
        return false;
      if(Number(options.lowestPrice) > item.sellingStatus[0]
        .convertedCurrentPrice[0].__value__ 
        && options.lowestPrice !== '')
        return false;
      if(Number(options.highestPrice) < item.sellingStatus[0]
        .convertedCurrentPrice[0].__value__ 
        && options.highestPrice !== '')
        return false;
    }
    return true;
  },

  filterDetail(options, obj) {
    const item = obj;
    if(options != null) {
      if(!options.shipping.some(shipping =>
        shipping === item.ShipToLocations)
        && options.shipping.length)
        return false;
      if(!options.condition.some(condition => 
        condition === item.ConditionID)
        && options.condition.length)
        return false;
      if(!options.status.some(status =>
        status === item.SellingStatus
        .ListingStatus)
        && options.status.length)
        return false;
      if(!options.categoryPath.some(path =>
        path === item.PrimaryCategory
        .CategoryName)
        && options.categoryPath.length)
        return false;
      if(!options.seller.some(selr => 
        selr === item.Seller
        .UserID)
        && options.seller.length)
        return false;
      if(!options.itemId.some(itemid => 
        itemid === item.ItemID)
        && options.itemId.length)
        return false;
      if(!isFinite(options.lowestPrice) 
        || !isFinite(options.highestPrice))
        return false;
      if(Number(options.lowestPrice) > item.SellingStatus
        .ConvertedCurrentPrice.sub
        && options.lowestPrice !== '')
        return false;
      if(Number(options.highestPrice) < item.SellingStatus
        .ConvertedCurrentPrice.sub
        && options.highestPrice !== '')
        return false;
    }
    return true;
  },

  traceLog(obj) {
    return log.trace(displayName, 'Trace log:', obj);
  },

  errorLog(err) {
    return log.error(displayName, 'Error occurred:', err);
  }
}
