import { map }        from 'rxjs/operators';
import { dispatch }   from '../dispatcher';
import NoteApiClient  from '../services/NoteApiClient';
import { spn, log }   from '../../utils/webutils';

const pspid = `NoteAction`;

export default {
  increment(options, page) {
    log.trace(`${pspid}>`, options);
    page = ++page > 0 ? page : 1;
    spn.spin();
    return NoteApiClient.fetchItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/note'
        , items, options, page });
      log.info(`${pspid}>`, 'Response: item/fetch/note');
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
      log.info(`${pspid}> Response: item/fetch/note`);
      spn.stop();
    });
  },
  writeItems(options) {
    spn.spin();
    return NoteApiClient.writeItems(options)
      .pipe(
        map(objs => {
          dispatch({ type: 'item/write/note', options });
          log.info(`${pspid}>`, 'Response: item/write/note');
          return objs;
        })
      )
    ;
  }
}
