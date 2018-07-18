import { ipcRenderer }  from 'electron';
import * as R           from 'ramda';
import { log }          from 'Utilities/webutils';

class ipc {
  constructor(props) {
    this.props = props;
  }

  set props(props) {
    this._props = props;
  }

  get props() {
    return this._props;
  }

  sendSync(request) {
    ipcRenderer.setMaxListeners(0);
    return ipcRenderer.sendSync('synchronous-message', request);
  }

  send(request, callback) {
    ipcRenderer.setMaxListeners(0);
    ipcRenderer.on('asynchronous-reply', (event, response) => {
      //log.info(fetch.displayName, 'Event', this.props.event);
      callback(null, response);
    });
    ipcRenderer.send('asynchronous-message', request);
  }

  setState(state) {
    this.state = Object.assign({} , this.state, state);
  }
};

class fetch extends ipc {
  constructor(props) {
    super(props);
    this.state = { url: props.url, message: '' };
  }

  static of(props) {
    props = R.is(Object, props) ? props : { url: props };
    return new fetch(props);
  }

  postXML(request, callback) {
    const { url, message } = this.state;
    const { head, body } = request;
    //log.info(fetch.displayName, 'Request', url, request);
    this.send({ method: 'POST', url, head, body, type: 'XML' }, (err, response) => {
      if(err) return callback(err);
      this.setState({ message: response });
      //log.trace(fetch.displayName, 'Response', response);
      callback(null, response);
    });
  }

  getJSON(request, callback) {
    const { url, message } = this.state;
    const { head, query, auth } = request;
    log.info(fetch.displayName, 'Request', url, request);
    this.send({ method: 'GET', url, auth, head, query, type: 'JSON' }, (err, response) => {
      if(err) return callback(err);
      this.setState({ message: response });
      log.trace(fetch.displayName, 'Response', response);
      callback(null, response);
    });
  }

  postSync(request) {
    const { url, message } = this.state;
    log.info(fetch.displayName, 'Request', url);
    const response = this.sendSync({ method: 'POST', url, head, body, type: 'XML' });
    this.setState({ message: response });
    log.trace(fetch.displayName, 'Response', response);
    return response;
  }
};
fetch.displayName = 'fetch';
export { fetch };
