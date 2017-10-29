import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `AppAction`;

export default {
  selectedContent(selected, title) {
    log.trace(`${pspid}>`, selected, title);
    dispatch({ type: 'content/select', selected, title });
  },
  fetchConfig() {
    return NoteApiClient.fetchConfig()
    .then(config => {
      dispatch({ type: 'config/fetch/appid', config });
      log.info(`${pspid}>`, 'Response: config/fetch/appid');
      log.trace(`${pspid}>`, 'Config:', config);
      spn.stop();
    });
  },
  writeConfig(obj) {
    return NoteApiClient.writeConfig(obj)
    .then(config => {
      dispatch({ type: 'config/write/appid', config });
      log.info(`${pspid}>`, 'Response: config/write/appid');
      log.trace(`${pspid}>`, 'Config:', config);
      spn.stop();
    });
  },
}
