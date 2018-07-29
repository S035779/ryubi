import * as R                   from 'ramda';
import { from, forkJoin, pipe } from 'rxjs';
import { map, flatMap }         from 'rxjs/operators';
import { log, spn, stor }       from 'Utilities/webutils';
import std                      from 'Utilities/stdutils';
import ipc                      from 'Utilities/ipcutils';

log.config('console', 'basic', 'ALL', 'electron-renderer');
spn.config('app');

const displayName = `NoteApiClient`;

let eBay = new Object();
export default {
  request(operation, options) {
    log.info(displayName, 'request', operation);
    switch(operation) {
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
          eBay = options;
          memory.setItem("eBay_config", JSON.stringify(options));
          resolve(options);
        });
      case 'findItemsByKeywords':
        return new Promise((resolve, reject) => {
          JSONP.request(eBay.findingApi, options, obj => {
            resolve(obj);
          });
        });
      case 'findCompletedItems':
        return new Promise((resolve, reject) => {
          JSONP.request(eBay.findingApi, options, obj => {
            resolve(obj);
          });
        });
      case 'findItemsByProduct':
        return new Promise((resolve, reject) => {
          JSONP.request(eBay.findingApi, options, obj => {
            resolve(obj);
          });
        });
      case 'client_credentials':
        return new Promise((resolve, reject) => {
          ipc.fetch.of(eBay.oauth2Api).post(options, (err, obj) => {
            if(err) return reject(err);
            resolve(obj);
          });
        });
      case 'code':
        return new Promise((resolve, reject) => {
          ipc.fetch.of(eBay.authorizeApi).auth(options, (err, obj) => {
            if(err) return reject(err);
            resolve(obj);
          });
        });
      case 'authorization_code':
        return new Promise((resolve, reject) => {
          ipc.fetch.of(eBay.oauth2Api).post(options, (err, obj) => {
            if(err) return reject(err);
            resolve(obj);
          });
        });
      case 'refresh_token':
        return new Promise((resolve, reject) => {
          ipc.fetch.of(eBay.oauth2Api).post(options, (err, obj) => {
            if(err) return reject(err);
            resolve(obj);
          });
        });
      case 'GetItem':
        return new Promise((resolve, reject) => {
          ipc.fetch.of(eBay.tradingApi).post(options, (err, obj) => {
            if(err) return reject(err);
            resolve(obj);
          });
        });
      case 'inventory_item':
        return new Promise((resolve, reject) => {
          ipc.fetch.of(eBay.inventoryApi + '/' + operation).get(options, (err, obj) => {
            if(err) return reject(err);
            resolve(obj);
          });
        });
      default:
        return new Promise(resolve => {
          log.error(displayName, 'Error', 'This operation is unknown.');
          resolve(options);
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
  
  getAppToken(scope) {
    return this.request('client_credentials', { 
      appid: eBay.appid, certid: eBay.certid, runame: eBay.runame, scope
    , operation: 'client_credentials', type: 'NV' 
    });
  },

  getCode(options, scope) {
    return this.request('code'
      , this.optCode({ appid: eBay.appid, runame: eBay.runame, operation: 'code', scope }, options))
  },

  getUserToken(code) {
    return this.request('authorization_code', { 
      appid: eBay.appid, certid: eBay.certid, runame: eBay.runame, code
    , operation: 'authorization_code', type: 'NV' 
    });
  },

  getRefreshToken(scope) {
    return this.request('refresh_token', {
      appid: eBay.appid, certid: eBay.certid, token: eBay.usertoken.refresh_token, scope
    , operation: 'refresh_token', type: 'NV'
    });
  },

  getItemDetails(options, items) {
    return this.request('GetItem', { 
      appid: eBay.appid, token: eBay.token, items, options, operation: 'GetItem', type: 'XML' 
    });
  },

  getInventoryItems(options, token) {
    return this.request('inventory_item', { 
      appid: eBay.appid, token, options, offset: 0, operation: 'inventory_item', type: 'JSON' 
    });
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
    return this.getItems(options, page)
      .then(this.resItems)
      .then(this.setItems)
  },
  
  fetchCompleteItems(options, page) {
    return this.getCompleteItems(options, page)
      .then(this.resCompleteItems)
      .then(this.setItems)
  },

  fetchProductsItems(options, page) {
    return this.getProductsItems(options, page)
      .then(this.resProductsItems)
      .then(this.setItems)
  },
  
  writeItems(options) {
    const streamItems   = idx   => from(this.getItems(options, idx));
    const streamDetail  = objs  => from(this.getItemDetails(options, objs));
    const forkItems     = obj   => forkJoin(this.forItems(options, obj));
    return streamItems(1).pipe(
        map(this.resItems)
      , flatMap(forkItems)
      , map(R.map(this.resItems.bind(this)))
      , map(R.map(this.setItems.bind(this)))
      , map(R.flatten)
      , flatMap(streamDetail)
      );
  },

  writeCompleteItems(options) {
    const streamItems   = idx   => from(this.getCompleteItems(options, idx));
    const streamDetail  = objs  => from(this.getItemDetails(options, objs));
    const forkItems     = obj   => forkJoin(this.forCompleteItems(options, obj));
    return streamItems(1).pipe(
        map(this.resCompleteItems)
      , flatMap(forkItems)
      , map(R.map(this.resCompleteItems.bind(this)))
      , map(R.map(this.setItems.bind(this)))
      , map(R.flatten)
      , flatMap(streamDetail)
      );
  },
  
  writeProductsItems(options) {
    const streamItems   = idx   => from(this.getProductsItems(options, idx));
    const streamDetail  = objs  => from(this.getItemDetails(options, objs));
    const forkItems     = obj   => forkJoin(this.forProductsItems(options, obj));
    return streamItems(1).pipe(
        map(this.resProductsItems)
      , flatMap(forkItems)
      , map(R.map(this.resProductsItems.bind(this)))
      , map(R.map(this.setItems.bind(this)))
      , map(R.flatten)
      , flatMap(streamDetail)
      );
  },
  
  fetchAppToken(state, scope) {
    const requestToken  = obj => from(this.getAppToken(obj));
    const setToken      = obj => R.merge(eBay, { apptoken: obj, appstate: state });
    const writeConfig   = obj => from(this.putConfig(obj));
    const getToken      = obj => obj.apptoken.access_token;
    return requestToken(scope).pipe(
        map(setToken)
      , flatMap(writeConfig)
      , map(getToken)
      );
  },

  fetchUserToken(state, scope) {
    const requestCode   = obj => from(this.getCode({ state }, obj));
    const requestToken  = obj => from(this.getUserToken(obj.authcode.code));
    const convCode      = obj => R.merge(obj, { code: decodeURIComponent(obj.code) });
    const setCode       = obj => R.merge(eBay, { authcode: convCode(obj) });
    const setToken      = obj => R.merge(eBay, { usertoken: obj, userstate: state, refreshstate: state });
    const writeConfig   = obj => from(this.putConfig(obj));
    const getToken      = obj => obj.usertoken.access_token;
    return requestCode(scope).pipe(
        map(setCode)
      , flatMap(writeConfig)
      , flatMap(requestToken)
      , map(setToken)
      , flatMap(writeConfig)
      , map(getToken)
      );
  },

  fetchRefreshToken(state, scope) {
    const requestToken  = obj => from(this.getRefreshToken(obj));
    const setToken      = obj => R.merge(eBay, { usertoken: R.merge(eBay.usertoken, obj), userstate: state });
    const writeConfig   = obj => from(this.putConfig(obj));
    const getToken      = obj => obj.usertoken.access_token;
    return requestToken(scope).pipe(
        map(setToken)
      , flatMap(writeConfig)
      , map(getToken)
      );
  },

  fetchToken(scope) {
    const state           = Date.now();
    const duUsrToken      = eBay.usertoken.expires_in * 1000 + eBay.userstate;
    const duRefToken      = eBay.usertoken.refresh_token_expires_in * 1000 + eBay.refreshstate;
    const isUsrToken      = !!eBay.usertoken.access_token;
    const isRefToken      = !!eBay.usertoken.refresh_token;
    const isUsrAvailable  = duUsrToken - state > 0;
    const isRefAvailable  = duRefToken - state > 0;
    log.info(displayName, 'User Token (existence/validity/duration/modified):'
      , isUsrToken, isUsrAvailable
      , std.getLocalTimeStamp(duUsrToken), std.getLocalTimeStamp(eBay.userstate));
    log.info(displayName, 'Refresh Token (existence/validity/duration/modified):'
      , isRefToken, isRefAvailable
      , std.getLocalTimeStamp(duRefToken), std.getLocalTimeStamp(eBay.refreshstate));
    return !isUsrToken && isRefToken 
      ? isUsrAvailable
        ? from([ eBay.usertoken.access_token ])
        : isRefAvailable
          ? this.fetchRefreshToken(state, scope) 
          : this.fetchUserToken(state, scope)
      : this.fetchUserToken(state, scope)
    ; 
  },

  writeInventoryItems(options) {
    const scope = [ 
      'https://api.ebay.com/oauth/api_scope'
    , 'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly'
    , 'https://api.ebay.com/oauth/api_scope/sell.marketing'
    , 'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly'
    , 'https://api.ebay.com/oauth/api_scope/sell.inventory'
    , 'https://api.ebay.com/oauth/api_scope/sell.account.readonly'
    , 'https://api.ebay.com/oauth/api_scope/sell.account'
    , 'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly'
    , 'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
    , 'https://api.ebay.com/oauth/api_scope/sell.analytics.readonly'
    ];
    const streamItems   = obj => from(this.getInventoryItems(options, obj));
  //  const streamDetail  = objs  => from(this.getItemDetails(objs));
  //  const forkItems     = obj   => forkJoin(this.forInventoryItems(options, obj));
  //  const forkJSON      = obj   => forkJoin(util.toJSON(obj));
    return this.fetchToken(scope).pipe(
        flatMap(streamItems)
      , map(R.tap(this.logTrace.bind(this)))
  //      map(this.resInventoryItems)
  //    , flatMap(forkItems)
  //    , map(R.map(this.resInventoryItems.bind(this)))
  //    , map(R.map(this.setItems.bind(this)))
  //    , map(R.flatten)
  //    , flatMap(from)
  //    , flatMap(streamDetail)
  //    , flatMap(forkJSON)
  //    , map(R.map(this.resDetail.bind(this)))
  //    , map(R.map(this.setDetail.bind(this)))
  //    , map(R.filter(R.curry(this.filterDetail.bind(this))(options)))
  //    , map(R.map(this.renderDetail.bind(this)))
  //    , map(R.map(util.toCSV.bind(this)))
  //    , map(R.map(csv => csv + '\n'))
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
  
  setItems(obj) {
    return  obj && obj.ack[0] === 'Success'
      ? obj.searchResult[0].item : null;
  },

  optCode(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const search = new Object();
    search['client_id'] = _o.appid;
    search['redirect_uri'] = _o.runame;
    search['response_type'] = _o.operation;
    search['scope'] = R.join(' ', _o.scope);
    search['state'] = _p.state;
    return { search, operation: _o.operation, state: _p.state };
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
    
    //log.trace(displayName, 'optItems:', options);
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
    options['paginationInput.entriesPerPage'] = 10;
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

    //log.trace(displayName, 'optProducts:', options);
    return options;
  },

  logTrace(obj) {
    return log.trace(displayName, 'Trace log:', obj);
  },

  logError(err) {
    return log.error(displayName, 'Error occurred:', err);
  }
}
