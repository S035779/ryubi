import { app, BrowserWindow, ipcMain  } from 'electron';
import path from 'path';
import url  from 'url';
import eBay from 'Utilities/eBay'; 
import log  from 'Utilities/logutils';

const env = process.env.NODE_ENV;

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = env === 'development';
const startUrl = process.env.API_URL || url.format({ 
  pathname: path.join(__dirname, '../public/index.html'), protocol: 'file:', slashes: true 
});

class MainWindow {
  constructor() {
    this.window = null;
    this.start();
    this.ipc();
  };

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
  };

  ipc() {
    ipcMain.on('asynchronous-message', (event, request) => {
      eBay.of(request).fetch().subscribe(
        response  => event.sender.send('asynchronous-reply', { response })
      , error     => event.sender.send('asynchronous-reply', { error })
      , ()        => log.info(MainWindow.displayName, 'Complete to request fetch.')
      );
    });

    ipcMain.on('synchronous-message', (event, request) => {
      eBay.of(request).fetch().subscribe(
        response  => event.returnValue = { response }
      , error     => event.returnValue = { error }
      , ()        => log.info(MainWindow.displayName, 'Complete to request fetch.')
      );
    });
  };

  createWindow() {
    this.window = new BrowserWindow({ 
      width: 1152, height: 964
    , webPreferences: { 
        nodeIntegration: true
      , preload: path.resolve(__dirname, './utils/preload.node.js') 
      } 
    });

    this.window.loadURL(startUrl);

    if(env === 'development') {
      this.window.webContents.openDevTools();

      //const extensions = BrowserWindow.getDevToolsExtensions();
      //if(!extensions.hasOwnProperty('devtron')) {
      //  BrowserWindow.addDevToolsExtension(require('devtron').path);
      //}
    }

    this.window.on('closed', event => this.window = null);
  };
};
MainWindow.displayName = 'MainWindow';
export default MainWindow;
