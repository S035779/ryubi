import * as R  from 'ramda';
import fs      from 'fs';
import { ipcRenderer, remote } from 'electron';
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
    ipcRenderer.on('asynchronous-reply', (event, { error, response }) => {
      if(error) return callback(error);
      this.setProps({ event });
      callback(null, response);
    });
    ipcRenderer.send('asynchronous-message', request);
  }

  sendSync(request) {
    const { error, response } = ipcRenderer.sendSync('synchronous-message', request);
    if(error) return error;
    return response;
  }

  setState(state) {
    this.state = R.merge(this.state, state);
  }

  setProps(props) {
    this.props = R.merge(this.props, props);
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
    //log.info(fetch.displayName, 'authUrl', authUrl);
    const BrowserWindow = remote.BrowserWindow;
    const authWindow = new BrowserWindow({ width: 800, height: 600, show: false
    , webPreferences: { nodeIntegration: false, webSecurity: false } 
    });
    const handleChangeUrl = newUrl => {
      //log.info(fetch.displayName, 'newUrl', newUrl);
      const raw_code  = /code=([^&]*)/.exec(newUrl) || null;
      const raw_state = /state=([^&]*)/.exec(newUrl) || null;
      const raw_expire = /expires_in=([^&]*)/.exec(newUrl) || null;
      const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      const state = (raw_state && raw_state.length > 1) ? raw_state[1] : null;
      const expires_in = (raw_expire && raw_expire.length > 1) ? raw_expire[1] : null;
      if (code && state && expires_in) {
        authWindow.destroy();
        if (Number(state) === request.state) callback(null, { code, state, expires_in });
        callback({ name: 'Error', message: 'This redirect page was not the expected status.' });
      }
    };
    authWindow.webContents.on('did-finish-load', () => handleChangeUrl(authWindow.webContents.getURL()));
    authWindow.once('ready-to-show', () => authWindow.show());
    authWindow.on('close', () => {
      authWindow.hide();
      callback({ name: 'Canceled', message: 'Content was incomplete. Please check the contents once again.' });
    });
    authWindow.loadURL(authUrl);
  }

  get(request, callback) {
    const { url } = this.state;
    this.send(R.merge({ url, method: 'GET' }, request), (error, response) => {
      if(error) return callback(error);
      this.setState({ response });
      callback(null, response);
    });
  }

  post(request, callback) {
    const { url } = this.state;
    this.send(R.merge({ url, method: 'POST' }, request), (error, response) => {
      if(error) return callback(error);
      this.setState({ response });
      callback(null, response);
    });
  }

  _post(request) {
    const { url } = this.state;
    const response = this.sendSync(R.merge({ url, method: 'POST' }, request));
    this.setState({ response });
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

  showErrorBox({ name, message }) {
    if(message.errors) {
      name     = message.errors[0].message;
      message  = message.errors[0].longMessage;
    } else 
    if(message.error) {
      name     = message.error;
      message  = message.error_description;
    }
    log.info(win.displayName, 'showErrorBox', name)
    remote.dialog.showErrorBox(name, message);
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
