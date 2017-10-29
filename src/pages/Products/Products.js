import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import productsStore from '../../stores/productsStore';
import ProductsBody from '../../components/ProductsBody/ProductsBody';
import { log } from '../../../utils/webutils';

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

