import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import completeStore from '../../stores/completeStore';
import CompleteBody from '../../components/CompleteBody/CompleteBody';
import { log } from '../../../utils/webutils';

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

