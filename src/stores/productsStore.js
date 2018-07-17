import { ReduceStore }  from 'flux/utils';
import dispatcher       from 'Main/dispatcher';
import { log }          from 'Utilities/webutils';

const displayName = `productsStore`;

class ProductsStore extends ReduceStore {
  getInitialState() {
    return {
      page:             0
      , items:          null
      , options: {
        productId:      ''
        , productType:  ''
        , pages:        ''
        , highestPrice: ''
        , lowestPrice:  ''
        , shipping:     []
        , condition:    []
        , status:       []
        , itemId:       []
        , categoryPath: []
        , seller:       []
      }
    };
  }
  
  reduce(state, action) {
    switch (action.type) {
      case 'item/fetch/products':
        return Object.assign({}, state
          , { items: action.items, options: action.options
            , page: action.page });
      case 'item/write/products':
        return Object.assign({}, state
          , { options: action.options });
      default:
        return state;
    }
  }
}

export default new ProductsStore(dispatcher);
