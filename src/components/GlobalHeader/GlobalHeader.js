import React    from 'react';
import { log }  from 'Utilities/webutils';

const pspid = `GlobalHeaderView`;

export default class GlobalHeader extends React.Component {
  render() {
    return <header className="toolbar toolbar-header">
      <h1 className="title">{this.props.title}</h1>
      <div className="toolbar-actions">
        <button
          className="btn btn-default btn-dropdown pull-right">
          <span className="icon icon-megaphone"></span>
        </button>
      </div>
    </header>;
  }
}
