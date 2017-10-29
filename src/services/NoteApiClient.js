import {parse, end} from 'iso8601-duration';
import { M, log, spn, str } from '../../utils/webutils';
import std from '../../utils/stdutils';

log.config('console', 'basic', 'ALL', 'note-renderer');
spn.config('app');

const pspid = `eBAPIClient`;

//const v1 = 'http://svcs.ebay.com/services/search/FindingService/v1'
//const v2 = 'http://open.api.ebay.com/shopping';
//const s1 = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1';
//const s2 = 'http://open.api.sandbox.ebay.com/shopping';
//const appid = 'Develope-WatchNot-PRD-05d7a0307-e288d29c';

let eBay = new Object();

export default {
  request(action, response) {
    log.info(`${pspid}>`, 'Request:', action);
    switch(action) {
      case 'config/fetch':
        return new Promise(resolve => {
          const memory = window.localStorage ||
            (window.UserDataStorage && new str.UserDataStorage()) ||
            new str.CookieStorage();
          eBay = JSON.parse(memory.getItem("eBay_config"));
          resolve(eBay);
        });
      case 'config/write':
        return new Promise(resolve => {
          const memory = window.localStorage ||
            (window.UserDataStorage && new str.UserDataStorage()) ||
            new str.CookieStorage();
          memory.setItem("eBay_config", JSON.stringify(response));
          resolve(response);
        });
      case 'findItemsByKeywords':
        return new Promise(resolve => {
          JSONP.request(eBay.findingApi, response, obj => {
            resolve(obj);
          });
        });
      case 'findCompletedItems':
        return new Promise(resolve => {
          JSONP.request(eBay.findingApi, response, obj => {
            resolve(obj);
          });
        });
      case 'findItemsByProduct':
        return new Promise(resolve => {
          JSONP.request(eBay.findingApi, response, obj => {
            resolve(obj);
          });
        });
      default:
        return new Promise(resolve => {
          log.warn(`${pspid}> Unknown request !!`);
          resolve(response);
        });
    }
  },
  
  fetchConfig() {
    return this.request('config/fetch');
  },

  writeConfig(config) {
    return this.request('config/write', config);
  },

  putItems(items) {
    return this.request('writeItemsByKeywords', items);
  },
  
  getItems(options, page) {
    return this.request('findItemsByKeywords'
      , this.optItems({
        appid: eBay.appid, page, operation: 'findItemsByKeywords'
      }, options));
  },
  
  fetchItems(options, page) {
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'page:', page);
    spn.spin();
    return this.getItems(options, page)
      .then(this.resItems)
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  
  writeItems(options) {
    const pages = options.pages;
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'pages:', pages);
    spn.spin();
    const mapIndexed = R.addIndex(R.map);
    return this.getItems(options, 1)
      .then(this.resItems)
      .then(R.curry(this.forItems.bind(this))(options))
      .then(R.map(this.resItems.bind(this)))
      .then(R.map(this.setItems.bind(this)))
      .then(R.flatten)
      .then(R.filter(R.curry(this.filterItem.bind(this))(options)))
      .then(mapIndexed((obj, idx) => this.renderItem(obj, idx + 1)))
      .then(this.addHeader.bind(this))
      .then(R.map(this.toCSV.bind(this)))
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },

  addHeader(obj) {
    let arr = new Array();
    for(let prop in obj[0]) {
      arr.push(prop);
    }
    obj.unshift(arr);
    return obj;
  },
  
  toCSV(obj) {
    let arr = new Array();
    for(let prop in obj) {
      arr.push(obj[prop]);
    }
    return arr.join();
  },
  
  forItems(options, res) {
    const pages = options.pages;
    const page =
      Number(res.paginationOutput[0].totalPages[0]) < pages
      ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    const newItems = [];
    
    for(let idx=1; idx <= page; idx++) {
      newItems.push(this.getItems(options, idx));
    }
    return Promise.all(newItems);
  },
  
  resItems(obj) {
    return obj.hasOwnProperty('findItemsByKeywordsResponse') 
      ? obj.findItemsByKeywordsResponse[0] : null;
  },
  
  putCompleteItems(items) {
    return this.request('writeCompletedItems', items);
  },
  
  getCompleteItems(options, page) {
    return this.request('findCompletedItems'
      , this.optItems({
        appid: eBay.appid, page, operation: 'findCompletedItems'
      }, options));
  },
  
  fetchCompleteItems(options, page) {
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'page:', page);
    spn.spin();
    return this.getCompleteItems(options, page)
      .then(this.resCompleteItems)
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  
  writeCompleteItems(options) {
    const pages = options.pages;
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'pages:', pages);
    spn.spin();
    const mapIndexed = R.addIndex(R.map);
    return this.getCompleteItems(options, 1)
      .then(this.resCompleteItems)
      .then(R.curry(this.forCompleteItems.bind(this))(options))
      .then(R.map(this.resCompleteItems.bind(this)))
      .then(R.map(this.setItems.bind(this)))
      .then(R.flatten)
      .then(R.filter(R.curry(this.filterItem.bind(this))(options)))
      .then(mapIndexed((obj, idx) => this.renderItem(obj, idx + 1)))
      .then(this.addHeader.bind(this))
      .then(R.map(this.toCSV.bind(this)))
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  
  forCompleteItems(options, res) {
    const pages = options.pages;
    const page =
      Number(res.paginationOutput[0].totalPages[0]) < pages
      ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    const newItems = [];
    
    for(let idx=1; idx <= page; idx++) {
      newItems.push(this.getCompleteItems(options, idx));
    }
    return Promise.all(newItems);
  },
  
  resCompleteItems(obj) {
    return obj.hasOwnProperty('findCompletedItemsResponse') 
      ? obj.findCompletedItemsResponse[0] : null;
  },
  
  putProductsItems(items) {
    return this.request('writeItemsByProduct', items);
  },
  
  getProductsItems(options, page) {
    return this.request('findItemsByProduct'
      , this.optProducts({
        appid: eBay.appid, page, operation: 'findItemsByProduct'
      }, options));
  },
  
  fetchProductsItems(options, page) {
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'page:', page);
    spn.spin();
    return this.getProductsItems(options, page)
      .then(this.resProductsItems)
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  
  writeProductsItems(options) {
    const pages = options.pages;
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'pages:', pages);
    spn.spin();
    const mapIndexed = R.addIndex(R.map);
    return this.getProductsItems(options, 1)
      .then(this.resProductsItems)
      .then(R.curry(this.forProductsItems.bind(this))(options))
      .then(R.map(this.resProductsItems.bind(this)))
      .then(R.map(this.setItems.bind(this)))
      .then(R.flatten)
      .then(R.filter(R.curry(this.filterItem.bind(this))(options)))
      .then(mapIndexed((obj, idx) => this.renderItem(obj, idx + 1)))
      .then(this.addHeader.bind(this))
      .then(R.map(this.toCSV.bind(this)))
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  
  forProductsItems(options, res) {
    const pages = options.pages;
    const page =
      Number(res.paginationOutput[0].totalPages[0]) < pages
      ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    const newItems = [];
    
    for(let idx=1; idx <= page; idx++) {
      newItems.push(this.getProductsItems(options, idx));
    }
    return Promise.all(newItems);
  },
  
  resProductsItems(obj) {
    return obj.hasOwnProperty('findItemsByProductResponse') 
      ? obj.findItemsByProductResponse[0] : null;
  },
  
  setItems(obj) {
    return  obj && obj.ack[0] === 'Success'
      ? obj.searchResult[0].item : null;
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
    options['paginationInput.entriesPerPage'] = 20;
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

    log.trace(`${pspid}>`, 'Request:', options);
    return options;
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
    options['paginationInput.entriesPerPage'] = 20;
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
      options['itemFilter(' +n+ ').value(0)'] =  std.setTimeStamp(_p.startDate);
      n++;
    }

    if(std.isValidDate(_p.endDate)) {
      options['itemFilter(' +n+ ').name'] = 'EndTimeTo';
      options['itemFilter(' +n+ ').value(0)'] = std.setTimeStamp(_p.endDate);
      n++;
    }
    
    log.trace(`${pspid}>`, 'Request:', options);
    return options;
  },

  traceLog(obj) {
    return log.trace(`${pspid}>`, 'Trace log:', obj);
  },

  errorLog(err) {
    return log.error(`${pspid}>`, 'Error occurred:', err);
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

  renderExtension(date) {
    return std.getLocalTimeStamp(end(parse(date)));
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
  }
}
