import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `productsStore`;

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
    log.info(`${pspid}> Request: ${action.type}`);
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
