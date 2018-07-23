import React              from 'react';
import CompleteAction     from 'Actions/CompleteAction';
import Radio              from 'Components/Radio/Radio';
import { log, spn, util } from 'Utilities/webutils';
import std                from 'Utilities/stdutils';

import fs from 'fs';
import electron from 'electron';
const remote = electron.remote;
const dialog = electron.remote.dialog;

const pspid = `CompleteSidebarView`;

export default class CompleteSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.options);
  }

  saveFile(filename, obj) {
    return new Promise((resolve, reject) => {
      fs.appendFile(filename, obj, err => {
        if(err) reject(err);
        resolve('File has been saved!');
      });
    });
  }

  touchFile(filename) {
    return new Promise(resolve => {
      fs.closeSync(fs.openSync(filename, 'w', 0o666));
      resolve('File has been touched!');
    });
  }

  showSaveDialog(callback) {
    const win = remote.getCurrentWindow();
    const options = {
      title: 'Save',
      filters: [
        { name: 'CSV File', extensions: ['csv']},
        { name: 'All Files', extensions: ['*'] }
    ]};
    dialog.showSaveDialog(win, options, callback);
  }

  showErrorBox(str) {
    dialog.showErrorBox("Error", str);
  }

  showSaveMessageBox() {
    const win = remote.getCurrentWindow();
    const options = {
      type: 'info'
      , buttons: [ 'OK' ]
      , title: 'Save file'
      , message: 'Save file'
      , detail: 'CSV file saved.'
    };
    dialog.showMessageBox(win, options);
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
    log.info(CompleteSidebar.displayName, 'Request', 'handleChangeSave');
    if(!Number(this.state.pages)) return this.showErrorBox('Pages is not a number!');
    this.showSaveDialog((filename) => {
      if(!filename) return log.info(CompleteSidebar.displayName, 'Response', 'File save canceled!');
      log.info(CompleteSidebar.displayName, 'filename', filename);
      this.touchFile(filename)
      .then(() => this.saveFile(filename, util.getCSVHeader(this.csvHeader())))
      .then(() => {
        spn.spin();
        CompleteAction.writeCompleteItems(this.state).subscribe(
          obj => this.saveFile(filename, obj)
        , err => {
            log.error(CompleteSidebar.displayName, err.name, err.message);
            this.showErrorBox(err.message);
            spn.stop();
          }
        , () => {
            log.info(CompleteSidebar.displayName, 'Response', 'File has been saved!');
            this.showSaveMessageBox();
            spn.stop();
          }
        )
      });
    });
  }

  handleChangeHome() {
    log.info(CompleteSidebar.displayName, 'Request', 'handleChangeHome');
    CompleteAction.increment(this.props.options, 0);
  }

  handleIncrement() {
    log.info(CompleteSidebar.displayName, 'Request', 'handleIncrement');
    CompleteAction.increment(this.props.options, this.props.page);
  }

  handleDecrement() {
    log.info(CompleteSidebar.displayName, 'Request', 'handleDecrement');
    CompleteAction.decrement(this.props.options, this.props.page);
  }

  handleChangeSearch(e) {
    log.info(CompleteSidebar.displayName, 'Request', 'handleChangeSearch');
    e.preventDefault();
    CompleteAction.increment(this.state, 0);
  }

  handleChangeReset() {
    log.info(CompleteSidebar.displayName, 'Request', 'handleChangeReset');
    this.setState({
      highestPrice:   ''
      , lowestPrice:  ''
      , shipping:     []
      , condition:    []
      , status:       []
      , itemId:       []
      , categoryPath: []
      , seller:       []
      , startDate:    ''
      , endDate:      ''
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
      <h5 className="nav-group-title">Title</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Search of items"
          value={this.state.searchString}
          onChange={
            this.handleChangeText.bind(this, 'searchString')} />
        </div>
      </span>
      <h5 className="nav-group-title">Sold listing</h5>
      <span className="nav-group-item">
        <div className="checkbox">
        <label><input type="checkbox"
          value="soldItemOnly"
          checked={this.state.soldItemOnly}
          onChange={
            this.handleChangeCheckbox.bind(this, 'soldItemOnly')}
        />Sold items only.</label>
        </div>
      </span>
      <h5 className="nav-group-title">End time</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="From Date (yyyy/mm/dd)"
          value={this.state.startDate}
          onChange={
            this.handleChangeText.bind(this, 'startDate')} />
        </div>
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="To Date (yyyy/mm/dd)"
          value={this.state.endDate}
          onChange={
            this.handleChangeText.bind(this, 'endDate')} />
        </div>
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
CompleteSidebar.displayName = 'CompleteSidebar';
