import { app }            from 'electron';
import MainWindow         from 'Views/main-window';
import AppMenu            from 'Views/app-menu';
//import { logs as log }    from 'Utilities/logutils';

const env = process.env.NODE_ENV;

if (env === 'development') {
//  log.config('console', 'color',  'electron-main', 'TRACE');
} else if (env === 'staging') {
//  log.config('file',    'basic',  'electron-main', 'DEBUG');
} else if (env === 'production') {
//  log.config('file',    'json',   'electron-main', 'INFO');
}

class Main {
  constructor() {
    this.start();
    this.MainWindow = new MainWindow();
  }

  start() {
    app.on('ready', () => {
      AppMenu.setup();
    });
  }
};
Main.displayName = 'Main';
const main = new Main();
