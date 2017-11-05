import React from 'react';
import ProductsAction from '../../actions/ProductsAction';
import Radio from '../../components/Radio/Radio';
import { app, log, spn, util } from '../../../utils/webutils';
import std from '../../../utils/stdutils';

const pspid = `ProductsSidebarView`;

export default class ProductsSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.options);
  }

  csvHeader() {
    return {
      'Image':                ''
      , 'Url':                ''
      , 'Title':              ''
      , 'StartTime':          ''
      , 'EndTime':            ''
      , 'Condition':          ''
      , 'Seller':             ''
      , 'ItemID':             ''
      , 'ProductID(UPC)':     ''
      , 'ProductID(EAN)':     ''
      , 'ProductID(ISBN)':    ''
      , 'Category':           ''
      , 'Shipping':           ''
      , 'CurrentPrice':       ''
      , 'CurrentCurrency':    ''
      , 'ConvertedPrice':     ''
      , 'ConvertedCurrency':  ''
      , 'Status':             ''
      , 'LeftTime':           ''
    };
  }

  handleChangeSave() {
    log.info(`${pspid}>`, 'Request: handleChangeSave');
    if(!Number(this.state.pages))
      return app.showErrorBox('Pages is not a number!');
    app.showSaveDialog((filename) => {
      if(!filename) 
        return log.info('File save canceled!');
      log.trace(`${pspid}>`, 'Save file:', filename);
      util.touchFile(filename)
      .then(() => util.saveFile(filename
          , util.getCSVHeader(this.csvHeader())))
      .then(() => {
        spn.spin();
        ProductsAction.writeProductsItems(this.state).subscribe(
          obj => util.saveFile(filename, obj)
          , err => app.showErrorBox(err.message)
          , () => {
            app.showSaveMessageBox();
            log.info('File has been saved!');
            spn.stop();
          }
        )
      });
    });
  }

  handleChangeHome() {
    log.info(`${pspid}>`, 'Request: handleChangeHome');
    log.trace(`${pspid}>`, this.props.options);
    ProductsAction.increment(this.props.options, 0);
  }

  handleIncrement() {
    log.info(`${pspid}>`, 'Request: handleIncrement');
    log.trace(`${pspid}>`, this.props.options);
    ProductsAction.increment(this.props.options, this.props.page);
  }

  handleDecrement() {
    log.info(`${pspid}> Request: handleDecrement`);
    log.trace(`${pspid}>`, this.props.options);
    ProductsAction.decrement(this.props.options, this.props.page);
  }

  handleChangeSearch(e) {
    log.info(`${pspid}>`, 'Request: handleChangeSearch');
    log.trace(`${pspid}>`, this.state);
    e.preventDefault();
    ProductsAction.increment(this.state, 0);
  }

  handleChangeReset() {
    log.info(`${pspid}>`, 'Request: handleChangeReset');
    log.trace(`${pspid}>`, this.state);
    this.setState({
      highestPrice:   ''
      , lowestPrice:  ''
      , shipping:     []
      , condition:    []
      , status:       []
      , itemId:       []
      , categoryPath: []
      , seller:       []
    });
  }

  handleChangeText(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleChangeCheckbox(name, e) {
    let newState = {};
    newState[name] = e.target.checked;
    this.setState(newState);
  }

  handleChangeRadio(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleChangeSelect(name, e) {
    let newState = {};
    let options = e.target.options;
    let values = [];
    for( let i=0; i<options.length; i++) {
      if(options[i].selected) values.push(options[i].value);
    }
    newState[name] = values;
    this.setState(newState);
  }

  renderOption(objs, prop1, prop2) {
    if(!objs) return null;
    const len = arguments.length;
    const items = objs.map(obj => {
      return (len === 2)
        ? obj[prop1][0]
        : obj[prop1][0][prop2][0];
    })
    const opts = std.dst(items);
    return opts.map((opt, idx) => {
      return <option
        key={"choice-" + idx} value={opt} >{opt}</option>;
    })
  }

  render() {
    const page = this.props.page;
    const optPaths = this.renderOption(this.props.items
      , 'primaryCategory', 'categoryName');
    const optSelrs = this.renderOption(this.props.items
      , 'sellerInfo', 'sellerUserName');
    const optImIDs = this.renderOption(this.props.items
      , 'itemId');
    const optShpgs = this.renderOption(this.props.items
      , 'shippingInfo', 'shipToLocations');
    const optSttss = this.renderOption(this.props.items
      , 'sellingStatus', 'sellingState');
    return <div className="pane pane-sm sidebar">
    <nav className="nav-group">
      <h5 className="nav-group-title">ProductID</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Search of items"
          value={this.state.productId}
          onChange={
            this.handleChangeText.bind(this, 'productId')} />
        </div>
      </span>
      <h5 className="nav-group-title">ProductType</h5>
      <span className="nav-group-item">
        <Radio name="productType"
          value={this.state.productType}
          onChange={
            this.handleChangeRadio.bind(this, 'productType')} >
          <option value="ReferenceID">ReferenceID</option>
          <option value="ISBN">ISBN</option>
          <option value="UPC">UPC</option>
          <option value="EAN">EAN</option>
        </Radio>
      </span>
      <span className="nav-group-item">
        <div className="form-actions">
        <button className="btn btn-mini btn-default"
          onClick={this.handleChangeReset.bind(this)}>Reset
        </button>
        <button className="btn btn-mini btn-primary"
          onClick={this.handleChangeSearch.bind(this)}>Search
        </button>
        </div>
      </span>
			<h5 className="nav-group-title">Functions</h5>
			<span className="nav-group-item"
        onClick={this.handleChangeHome.bind(this)}>
				<span className="icon icon-home"></span>
				Home ({page} page)
			</span>
			<span className="nav-group-item"
        onClick={this.handleIncrement.bind(this)}>
				<span className="icon icon-right-bold"></span>
				Next
			</span>
			<span className="nav-group-item"
        onClick={this.handleDecrement.bind(this)}>
				<span className="icon icon-left-bold"></span>
				Previous
			</span>
      <h5 className="nav-group-title">Output</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Number of pages"
          value={this.state.pages}
          onChange={
            this.handleChangeText.bind(this, 'pages')} />
        </div>
      </span>
      <span className="nav-group-item">
        <div className="form-actions">
        <button className="btn btn-mini btn-primary"
          onClick={this.handleChangeSave.bind(this)}>Save
        </button>
        </div>
      </span>
      <h5 className="nav-group-title">Category</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.categoryPath}
          onChange={
            this.handleChangeSelect.bind(this, 'categoryPath')}
        >{optPaths}</select>
      </span>
      <h5 className="nav-group-title">Seller</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.seller}
          onChange={this.handleChangeSelect.bind(this, 'seller')}
        >{optSelrs}</select>
      </span>
      <h5 className="nav-group-title">ItemID</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.itemId}
          onChange={
            this.handleChangeSelect.bind(this, 'itemId')}
        >{optImIDs}</select>
      </span>
      <h5 className="nav-group-title">Price</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Highest price" 
          value={this.state.highestPrice}
          onChange={
            this.handleChangeText.bind(this, 'highestPrice')} />
        </div>
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Lowest price" 
          value={this.state.lowestPrice}
          onChange={
            this.handleChangeText.bind(this, 'lowestPrice')} />
        </div>
      </span>
      <h5 className="nav-group-title">Shipping</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.shipping}
          onChange={
            this.handleChangeSelect.bind(this, 'shipping')}
        >{optShpgs}</select>
      </span>
      <h5 className="nav-group-title">Condition</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.condition}
          onChange={
            this.handleChangeSelect.bind(this, 'condition')}>
          <option value="1000">New</option>
          <option value="1500">
            New other (see details)</option>
          <option value="1750">
            New with defects</option>
          <option value="2000">
            Manufacturer refurbished</option>
          <option value="2500">
            Seller refurbished</option>
          <option value="3000">Used</option>
          <option value="4000">Very Good</option>
          <option value="5000">Good</option>
          <option value="6000">Acceptable</option>
          <option value="7000">
            For parts or not working</option>
        </select>
      </span>
      <h5 className="nav-group-title">Status</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.status}
          onChange={
            this.handleChangeSelect.bind(this, 'status')}
          >{optSttss}</select>
      </span>
    </nav>
    </div>;
  }
};
