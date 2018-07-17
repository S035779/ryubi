import { ReduceStore }  from 'flux/utils';
import dispatcher       from 'Main/dispatcher';
import { log }          from 'Utilities/webutils';

const displayName = `noteStore`;

class NoteStore extends ReduceStore {
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
        , startDate:    ''
        , endDate:      ''
      }
    };
  }
  
  reduce(state, action) {
    switch (action.type) {
      case 'item/fetch/note':
        return Object.assign({}, state
          , { items: action.items, options: action.options
            , page: action.page });
      case 'item/write/note':
        return Object.assign({}, state
          , { options: action.options });
      default:
        return state;
    }
  }
}

export default new NoteStore(dispatcher);
