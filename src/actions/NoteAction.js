import { map }        from 'rxjs/operators';
import { dispatch }   from 'Main/dispatcher';
import NoteApiClient  from 'Services/NoteApiClient';
import { spn, log }   from 'Utilities/webutils';

const displayName = `NoteAction`;

export default {
  increment(options, page) {
    page = ++page > 0 ? page : 1;
    spn.spin();
    return NoteApiClient.fetchItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/note'
        , items, options, page });
      spn.stop();
    });
  },
  decrement(options, page) {
    page = --page > 0 ? page : 1;
    spn.spin();
    return NoteApiClient.fetchItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/note'
        , items, options, page });
      spn.stop();
    });
  },
  writeItems(options) {
    spn.spin();
    return NoteApiClient.writeItems(options)
      .pipe(
        map(objs => {
          dispatch({ type: 'item/write/note', options });
          return objs;
        })
      )
    ;
  }
}
