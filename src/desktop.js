import sourceMapSupport    from 'source-map-support';
import { app }            from 'electron';
import MainWindow         from 'Views/main-window';
import AppMenu            from 'Views/app-menu';
import log                from 'Utilities/logutils';
sourceMapSupport.install();

const env = process.env.NODE_ENV;

if (env === 'development') {
  log.config('console', 'color',  'electron-main', 'TRACE');
} else if (env === 'staging') {
  log.config('file',    'basic',  'electron-main', 'DEBUG');
} else if (env === 'production') {
  log.config('file',    'json',   'electron-main', 'INFO');
}

class Main {
  constructor() {
    this.start();
    this.MainWindow = new MainWindow();
  }

  start() {
    app.on('ready', () => {
      log.info(Main.displayName, 'start', 'application');
      AppMenu.setup();
    });
  }
};
Main.displayName = 'Main';
const main = new Main();
