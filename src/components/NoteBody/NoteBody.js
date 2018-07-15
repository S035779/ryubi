import React        from 'react';
import NoteSidebar  from 'Components/NoteSidebar/NoteSidebar';
import NoteTable    from 'Components/NoteTable/NoteTable';
import { log }      from 'Utilities/webutils';

const pspid = `NoteBodyView`;

export default class NoteBody extends React.Component {
  render() {
    return <div className="pane-group">
      <NoteSidebar
        page={this.props.page}
        items={this.props.items}
        options={this.props.options} />
      <NoteTable
        items={this.props.items}
        options={this.props.options} />
    </div>;
  }
};
