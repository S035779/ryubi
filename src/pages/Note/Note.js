import React              from 'react';
import { Container }      from 'flux/utils';
import ContainerConverter from 'Main/FluxContainerConverter';
import noteStore          from 'Stores/noteStore';
import NoteBody           from 'Components/NoteBody/NoteBody';
import { log }            from 'Utilities/webutils';

const pspid = `NoteControlerView`;

class Note extends React.Component {
  static getStores() {
    return [noteStore];
  }

  static calculateState() {
    return noteStore.getState();
  }

  render() {
    return <NoteBody
      page={this.state.page}
      items={this.state.items}
      options={this.state.options} />;
  }
}
export default Container.create(ContainerConverter.convert(Note));

