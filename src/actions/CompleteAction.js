import { map }        from 'rxjs/operators';
import { dispatch }   from 'Main/dispatcher';
import NoteApiClient  from 'Services/NoteApiClient';
import { spn, log }   from 'Utilities/webutils';

const pspid = `CompleteAction`;

export default {
  increment(options, page) {
    log.trace(`${pspid}>`, options);
    page = ++page > 0 ? page : 1;
    spn.spin();
    return NoteApiClient.fetchCompleteItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/complete'
        , items, options, page });
      log.info(`${pspid}>`, 'Response: item/fetch/complete');
      spn.stop();
    });
  },
  decrement(options, page) {
    page = --page > 0 ? page : 1;
    spn.spin();
    return NoteApiClient.fetchCompleteItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/complete'
        , items, options, page });
      log.info(`${pspid}> Response: item/fetch/complete`);
      spn.stop();
    });
  },
  writeCompleteItems(options) {
    spn.spin();
    return NoteApiClient.writeCompleteItems(options).pipe(
      map(objs => {
        dispatch({ type: 'item/write/complete', options });
        log.info(`${pspid}>`, 'Response: item/write/complete');
        return objs;
      }));
  }
}
