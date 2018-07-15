import React              from 'react';
import { Container }      from 'flux/utils';
import ContainerConverter from 'Main/FluxContainerConverter';
import productsStore      from 'Stores/productsStore';
import ProductsBody       from 'Components/ProductsBody/ProductsBody';
import { log }            from 'Utilities/webutils';

const pspid = `ProductsControlerView`;

class Products extends React.Component {
  static getStores() {
    return [productsStore];
  }

  static calculateState() {
    return productsStore.getState();
  }

  render() {
    return <ProductsBody
      page={this.state.page}
      items={this.state.items}
      options={this.state.options} />;
  }
}
export default Container.create(ContainerConverter.convert(Products));

