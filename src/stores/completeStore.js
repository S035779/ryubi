import { ReduceStore }  from 'flux/utils';
import dispatcher       from 'Main/dispatcher';
import { log }          from 'Utilities/webutils';

const pspid = `completeStore`;

class CompleteStore extends ReduceStore {
  getInitialState() {
    return {
      page:             0 
      , items:          null
      , options: {
        searchString:   ''
        , pages:        ''
        , highestPrice: ''
        , lowestPrice:  ''
        , shipping:     []
        , condition:    []
        , status:       []
        , itemId:       []
        , categoryPath: []
        , seller:       []
        , soldItemOnly: false
        , startDate:    ''
        , endDate:      ''
      }
    };
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      case 'item/fetch/complete':
        return Object.assign({}, state
          , { items: action.items, options: action.options
            , page: action.page });
      case 'item/write/complete':
        return Object.assign({}, state
          , { options: action.options });
      default:
        return state;
    }
  }
}

export default new CompleteStore(dispatcher);
