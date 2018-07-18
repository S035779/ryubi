import React        from 'react';
import AppAction    from 'Actions/AppAction';
import { log, spn, util } from 'Utilities/webutils';

import fs from 'fs';
import electron from 'electron';
const remote = electron.remote;
const dialog = electron.remote.dialog;

const pspid = `GlobalFooterView`;

export default class GlobalFooter extends React.Component {
  saveFile(filename, obj) {
    return new Promise((resolve, reject) => {
      fs.appendFile(filename, obj, err => {
        if(err) reject(err);
        resolve('File has been saved!');
      });
    });
  }

  touchFile(filename) {
    return new Promise(resolve => {
      fs.closeSync(fs.openSync(filename, 'w', 0o666));
      resolve('File has been touched!');
    });
  }

  showSaveDialog(callback) {
    const win = remote.getCurrentWindow();
    const options = {
      title: 'Save',
      filters: [
        { name: 'CSV File', extensions: ['csv']},
        { name: 'All Files', extensions: ['*'] }
    ]};
    dialog.showSaveDialog(win, options, callback);
  }

  showErrorBox(str) {
    dialog.showErrorBox("Error", str);
  }

  showSaveMessageBox() {
    const win = remote.getCurrentWindow();
    const options = {
      type: 'info'
      , buttons: [ 'OK' ]
      , title: 'Save file'
      , message: 'Save file'
      , detail: 'CSV file saved.'
    };
    dialog.showMessageBox(win, options);
  }

  csvHeader() {
    return {
    };
  }

  handleChangeSave() {
    log.info(`${pspid}>`, 'Request: handleChangeSave');
    this.showSaveDialog((filename) => {
      if(!filename) return log.info('File save canceled!');
      log.trace(`${pspid}>`, 'Save file:', filename);
      this.touchFile(filename)
      .then(() => this.saveFile(filename, util.getCSVHeader(this.csvHeader())))
      .then(() => {
        spn.spin();
        AppAction.writeInventoryItems(this.state).subscribe(
          obj => this.saveFile(filename, obj)
        , err => this.showErrorBox(err.message)
        , () => {
            this.showSaveMessageBox();
            log.info('File has been saved!');
            spn.stop();
          }
        )
      });
    });
  }

  showCloseMessageBox(callback) {
    const win = remote.getCurrentWindow();
    const options = {
      type: 'info',
      buttons: ['OK', 'Cancel'],
      title: 'Quit',
      message: 'Would you like to close this window?',
      detail: 'Close this window.'
    };
    dialog.showMessageBox(win, options, callback);
  }

  close() {
    const win = remote.getCurrentWindow();
    win.close();
  }

  handleChangeClose() {
    this.showCloseMessageBox((response) => {
      log.trace(`${pspid}>`, 'Click button:', response);
      if(!response) this.close();
    });
  }

  render() {
    return <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
      <button className="btn btn-default" onClick={this.handleChangeClose.bind(this)}>Close</button>
      <button className="btn btn-primary pull-right" onClick={this.handleChangeSave.bind(this)}>Save</button>
      </div>
    </footer>;
  }
};
