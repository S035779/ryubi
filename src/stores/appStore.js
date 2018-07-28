import { ReduceStore }  from 'flux/utils';
import dispatcher       from 'Main/dispatcher';
import { log }          from 'Utilities/webutils';

class AppStore extends ReduceStore {
  getInitialState() {
    return {
      selected: 0
      , title: ''
      , config: {
          selected: ''
        , title:    ''
        , appid:    ''
        , certid:   ''
        , token:    ''
        , runame:   ''
        , authorizeApi: ''
        , oauth2Api:    ''
        , findingApi:   ''
        , tradingApi:   ''
        , inventoryApi: ''
        , marketingApi: ''
        , analyticsApi: ''
        , authcode: null
        , usertoken: null
        }
      , options: null
      };
  }
  
  reduce(state, action) {
    switch (action.type) {
      case 'content/select':
        return Object.assign({}, state, { selected: action.selected, title: action.title });
      case 'config/fetch/appid':
        return Object.assign({}, state, { config: action.config });
      case 'config/write/appid':
        return Object.assign({}, state, { config: action.config });
      case 'item/write/inventory':
        return Object.assign({}, state, { options: action.options });
      default:
        return state;
    }
  }
};
export default new AppStore(dispatcher);
