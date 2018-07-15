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
        , title: ''
        , appid: ''
        , token: ''
        , findingApi: ''
        , tradingApi: ''
        }
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
      default:
        return state;
    }
  }
};
export default new AppStore(dispatcher);
