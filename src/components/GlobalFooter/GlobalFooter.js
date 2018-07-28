import React              from 'react';
import AppAction          from 'Actions/AppAction';
import { log, spn, util } from 'Utilities/webutils';
import ipc                from 'Utilities/ipcutils';

const pspid = `GlobalFooterView`;

class GlobalFooter extends React.Component {
  csvHeader() {
    return {
    };
  }

  handleChangeSave() {
    log.info(GlobalFooter.displayName, 'Request: handleChangeSave');
    ipc.win.showSaveDialog((filename) => {
      if(!filename) return log.error(GlobalFooter.displayName, 'Error', 'File save canceled!');
      spn.spin();
      ipc.sys.touchFile(filename)
      .then(() => ipc.sys.addbomFile(filename))
      .then(() => ipc.sys.saveFile(filename, util.getCSVHeader(this.csvHeader())))
      .then(() => {
        AppAction.writeInventoryItems(this.state).subscribe(
          obj => ipc.sys.saveFile(filename, obj)
        , err => {
            log.error(GlobalFooter.displayName, err.name, err.message);
            ipc.win.showErrorBox(err);
            spn.stop();
          }
        , () => {
            log.info(GlobalFooter.displayName, 'handleChangeSave', 'File has been saved!');
            ipc.win.showSaveMessageBox();
            spn.stop();
          });
      });
    });
  }

  handleChangeClose() {
    ipc.win.showCloseMessageBox((response) => {
      log.trace(GlobalFooter.displayName, 'Click button:', response);
      if(!response) ipc.win.close();
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
GlobalFooter.displayName = 'GlobalFooter';
export default GlobalFooter;
