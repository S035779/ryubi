import React              from 'react';
import { Container }      from 'flux/utils';
import ContainerConverter from 'Main/FluxContainerConverter';
import completeStore      from 'Stores/completeStore';
import CompleteBody       from 'Components/CompleteBody/CompleteBody';
import { log }            from 'Utilities/webutils';

const pspid = `CompleteControlerView`;

class Complete extends React.Component {
  static getStores() {
    return [completeStore];
  }

  static calculateState() {
    return completeStore.getState();
  }

  render() {
    return <CompleteBody
      page={this.state.page}
      items={this.state.items}
      options={this.state.options} />;
  }
}
export default Container.create(ContainerConverter.convert(Complete));

