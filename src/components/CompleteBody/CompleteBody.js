import React from 'react';
import CompleteSidebar from '../../components/CompleteSidebar/CompleteSidebar';
import CompleteTable from '../../components/CompleteTable/CompleteTable';
import { log } from '../../../utils/webutils';

const pspid = `CompleteBodyView`;

export default class CompleteBody extends React.Component {
  render() {
    return <div className="pane-group">
      <CompleteSidebar
        page={this.props.page}
        items={this.props.items}
        options={this.props.options} />
      <CompleteTable
        items={this.props.items}
        options={this.props.options} />
    </div>;
  }
};
