import { dispatch }   from 'Main/dispatcher';
import NoteApiClient  from 'Services/NoteApiClient';
import { log }   from 'Utilities/webutils';

const pspid = `AppAction`;

export default {
  selectedContent(selected, title) {
    dispatch({ type: 'content/select', selected, title });
  },
  fetchConfig() {
    return NoteApiClient.getConfig()
    .then(config => {
      dispatch({ type: 'config/fetch/appid', config });
    });
  },
  writeConfig(obj) {
    return NoteApiClient.putConfig(obj)
    .then(config => {
      dispatch({ type: 'config/write/appid', config });
    });
  }
}
