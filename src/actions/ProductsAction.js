import { map }        from 'rxjs/operators';
import { dispatch }   from 'Main/dispatcher';
import NoteApiClient  from 'Services/NoteApiClient';
import { log }        from 'Utilities/webutils';

const pspid = `ProductsAction`;

export default {
  increment(options, page) {
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchProductsItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/products', items, options, page });
    });
  },
  decrement(options, page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchProductsItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/products', items, options, page });
    });
  },
  writeProductsItems(options) {
    return NoteApiClient.writeProductsItems(options).pipe(
      map(objs => {
        dispatch({ type: 'item/write/products', options });
        return objs;
      }));
  }
}
