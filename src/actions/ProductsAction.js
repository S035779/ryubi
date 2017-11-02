import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `ProductsAction`;

export default {
  increment(options, page) {
    log.trace(`${pspid}>`, options);
    page = ++page > 0 ? page : 1;
    spn.spin();
    return NoteApiClient.fetchProductsItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/products'
        , items, options, page });
      log.info(`${pspid}>`, 'Response: item/fetch/products');
      spn.stop();
    });
  },
  decrement(options, page) {
    page = --page > 0 ? page : 1;
    spn.spin();
    return NoteApiClient.fetchProductsItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/products'
        , items, options, page });
      log.info(`${pspid}> Response: item/fetch/products`);
      spn.stop();
    });
  },
  writeProductsItems(options) {
    spn.spin();
    return NoteApiClient.writeProductsItems(options)
    .map(csv => {
      dispatch({ type: 'item/write/products', options });
      log.info(`${pspid}>`, 'Response: item/write/products');
      return csv;
    });
  },
}
