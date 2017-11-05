const electron = require('electron');
const app = electron.app;
const MainWindow = require('./views/main-window');
const AppMenu = require('./views/app-menu');

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

const main = new Main();
