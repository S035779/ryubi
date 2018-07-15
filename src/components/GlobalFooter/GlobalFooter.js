import React    from 'react';
import { log }  from 'Utilities/webutils';

import electron from 'electron';
const remote = electron.remote;
const dialog = electron.remote.dialog;

const pspid = `GlobalFooterView`;

export default class GlobalFooter extends React.Component {
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

  handleClickClose() {
    this.showCloseMessageBox((response) => {
      log.trace(`${pspid}>`, 'Click button:', response);
      if(!response) this.close();
    });
  }

  render() {
    return <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
      <button
        onClick={this.handleClickClose.bind(this)}
        className="btn btn-default"
      >Close</button>
      </div>
    </footer>;
  }
};
