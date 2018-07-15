import React            from 'react';
import ProductsSidebar  from 'Components/ProductsSidebar/ProductsSidebar';
import ProductsTable    from 'Components/ProductsTable/ProductsTable';
import { log }          from 'Utilities/webutils';

const pspid = `ProductsBodyView`;

export default class ProductsBody extends React.Component {
  render() {
    return <div className="pane-group">
      <ProductsSidebar
        page={this.props.page}
        items={this.props.items}
        options={this.props.options} />
      <ProductsTable
        items={this.props.items}
        options={this.props.options} />
    </div>;
  }
};
