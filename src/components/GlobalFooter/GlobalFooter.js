import React from 'react';
import { app, log } from '../../../utils/webutils';

const pspid = `GlobalFooterView`;

export default class GlobalFooter extends React.Component {
  handleClickClose() {
    app.showCloseMessageBox((response) => {
      log.trace(`${pspid}>`, 'Click button:', response);
      if(!response) app.close();
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
