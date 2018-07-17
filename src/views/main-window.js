const { app, BrowserWindow  } = require('electron');

const path = require('path');
const url = require('url');
const node_env = process.env.NODE_ENV;
const startUrl = process.env.API_URL || url.format({
  pathname: path.join(__dirname, '../public/index.html')
, protocol: 'file:'
, slashes: true
});
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = node_env === 'development' ? true : false;

module.exports = class MainWindow {
  constructor() {
    this.window = null;
    this.start();
  }

  start() {
    app.on('ready', () => {
      this.createWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    });

    app.on('activate', () => {
      if (this.window === null) {
        createWindow()
      }
    });

    app.on('showFormNote', () => {
      this.window.show();
    });
  }

  createWindow() {
    this.window = new BrowserWindow({ 
      width: 1152, height: 964
    , webPreferences: { 
        nodeIntegration: true
      , preload: path.resolve(__dirname, './utils/preload.node.js') 
      } 
    });

    this.window.loadURL(startUrl);

    if(node_env === 'development') {
      this.window.webContents.openDevTools();

      //const extensions = BrowserWindow.getDevToolsExtensions();
      //if(!extensions.hasOwnProperty('devtron')) {
      //  BrowserWindow.addDevToolsExtension(require('devtron').path);
      //}
    }

    this.window.on('closed', event => this.window = null);
  }
};
