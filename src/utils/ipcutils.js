import { ipcRenderer, remote } from 'electron';
import fs      from 'fs';
import * as R  from 'ramda';
import std     from 'Utilities/stdutils';
import { log } from 'Utilities/webutils';

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

  send(request, callback) {
    //ipcRenderer.setMaxListeners(0);
    ipcRenderer.on('asynchronous-reply', (event, response) => {
      if(response.error) return callback(response.error);
      this.setProps({ event });
      callback(null, response);
    });
    ipcRenderer.send('asynchronous-message', request);
  }

  sendSync(request) {
    //ipcRenderer.setMaxListeners(0);
    const response = ipcRenderer.sendSync('synchronous-message', request);
    if(response.error) return response.error;
    return response;
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);
  }

  setProps(props) {
    this.props = Object.assign({}, this.props, props);
  }
};
ipc.displayName = 'ipc';

class fetch extends ipc {
  constructor(props) {
    super(props);
    this.state = { url: props.url, response: '' };
  }

  static of(props) {
    props = R.is(Object, props) ? props : { url: props };
    return new fetch(props);
  }

  auth(request, callback) {
    const { url } = this.state;
    const { search } = request;
    const authUrl = search ? url + '?' + std.urlencode(search) : url;
    log.info(fetch.displayName, 'authUrl', authUrl);
    const authWindow = new remote.BrowserWindow({ 
      width: 800, height: 600, show: false
    , webPreferences: { nodeIntegration: false, webSecurity: false } 
    });
    const handleChangeUrl = newUrl => {
      log.info(fetch.displayName, 'newUrl', newUrl);
      const raw_code  = /code=([^&]*)/.exec(newUrl) || null;
      const raw_state = /state=([^&]*)/.exec(newUrl) || null;
      const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      const state = (raw_state && raw_state.length > 1) ? raw_state[1] : null;
      if (!code) return callback({ name: 'Error', message: 'Authorization Code was not found!!'});
      authWindow.destroy();
      callback(null, { code, state });
    };
    authWindow.webContents.on('will-navigate', (event, newUrl) => handleChangeUrl(newUrl));
    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => handleChangeUrl(newUrl));
    authWindow.once('ready-to-show', () => authWindow.show());
    authWindow.on('closed', () => authWindow = null);
    authWindow.loadURL(authUrl);
  }

  get(request, callback) {
    const { url } = this.state;
    const { appid, runame, token, operation, type, options, offset } = request;
    //log.info(fetch.displayName, 'Request', url, request);
    this.send({ url, method: 'GET', appid, runame, token, operation, type, options, offset }
    , (error, response) => {
      if(error) return callback(error);
      this.setState({ response });
      //log.trace(fetch.displayName, 'response', response);
      callback(null, response);
    });
  }

  post(request, callback) {
    const { url } = this.state;
    const { appid, certid, runame, token, operation, type, options, items } = request;
    log.info(fetch.displayName, 'Request', url, request);
    this.send({ url, method: 'POST', appid, certid, runame, token, operation, type, options, items }
    , (error, response) => {
      if(error) return callback(error);
      this.setState({ response });
      //log.trace(fetch.displayName, 'response', response);
      callback(null, response);
    });
  }

  _post(request) {
    const { url } = this.state;
    const { appid, certid, runame, token, operation, type, options, items } = request;
    //log.info(fetch.displayName, 'Request', url);
    const response 
      = this.sendSync({ url, method: 'POST', appid, certid, runame, token, operation, type, options, items });
    this.setState({ response });
    //log.trace(fetch.displayName, 'response', response);
    return response;
  }
};
fetch.displayName = 'fetch';

const win = {
  displayName: 'win',
  showSaveDialog(callback) {
    const title = 'Save';
    log.info(win.displayName, 'showSaveDialog', title)
    const current = remote.getCurrentWindow();
    const options = {
      title
    , filters: [
        { name: 'CSV File', extensions: ['csv']}
      , { name: 'All Files', extensions: ['*'] }
      ]
    };
    remote.dialog.showSaveDialog(current, options, callback);
  },

  showErrorBox(str) {
    const title = 'Error';
    log.info(win.displayName, 'showErrorBox', title)
    remote.dialog.showErrorBox(title, str);
  },

  showCloseMessageBox(callback) {
    const title = 'Quit';
    log.info(win.displayName, 'showCloseMessageBox', title)
    const current = remote.getCurrentWindow();
    const options = {
      title
    , type: 'info'
    , buttons: ['OK', 'Cancel']
    , message: 'Would you like to close this window?'
    , detail: 'Close this window.'
    };
    remote.dialog.showMessageBox(current, options, callback);
  },

  showSaveMessageBox() {
    const title = 'Save';
    log.info(win.displayName, 'showSaveMessageBox', title)
    const current = remote.getCurrentWindow();
    const options = {
      title
    , type: 'info'
    , buttons: [ 'OK' ]
    , message: 'Save file'
    , detail: 'CSV file saved.'
    };
    remote.dialog.showMessageBox(current, options);
  },

  close() {
    const title = 'Close';
    log.info(win.displayName, 'close', title)
    const current = remote.getCurrentWindow();
    current.close();
  }
};

const sys = {
  displayName: 'sys',
  addbomFile(filename) {
    const obj =  Buffer.from([0xEF, 0xBB, 0xBF]);
    return new Promise((resolve, reject) => {
      fs.appendFile(filename, obj, err => {
        if(err) reject(err);
        resolve('File has been saved!');
      });
    });
  },

  saveFile(filename, obj) {
    return new Promise((resolve, reject) => {
      fs.appendFile(filename, obj, err => {
        if(err) reject(err);
        resolve('File has been saved!');
      });
    });
  },

  touchFile(filename) {
    return new Promise(resolve => {
      fs.closeSync(fs.openSync(filename, 'w', 0o666));
      resolve('File has been touched!');
    });
  }
};

export default { fetch, win, sys };
