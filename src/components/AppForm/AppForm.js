import React        from 'react';
import PropTypes    from 'prop-types';
import AppAction    from 'Actions/AppAction';
import { spn, log } from 'Utilities/webutils';

class AppForm extends React.Component {
  constructor(props) {
    super(props);
    const config = props.config;
    this.state = {
      appid:      config.appid      ? config.appid      : ''
    , certid:     config.certid     ? config.certid     : ''
    , token:      config.token      ? config.token      : ''
    , runame:     config.runame     ? config.runame     : ''
    , authorizeApi: config.authorizeApi ? config.authorizeApi : ''
    , oauth2Api:    config.oauth2Api    ? config.oauth2Api    : ''
    , findingApi:   config.findingApi   ? config.findingApi   : ''
    , tradingApi:   config.tradingApi   ? config.tradingApi   : ''
    , inventoryApi: config.inventoryApi ? config.inventoryApi : ''
    , marketingApi: config.marketingApi ? config.marketingApi : ''
    , analyticsApi: config.analyticsApi ? config.analyticsApi : ''
    };
  }

  handleChangeSave(e) {
    const { config } = this.props;
    log.info(AppForm.dilplayName, 'Request: handleChangeSave', config);
    e.preventDefault();
    const newConfig = Object.assign({}, config, this.state);
    spn.spin();
    AppAction.writeConfig(newConfig)
      .then(() => spn.stop());
  }

  handleChangeText(name, e) {
    this.setState({ [name]: e.target.value });
  }

  render() {
    log.trace(AppForm.displayName, 'State', this.state);
    log.trace(AppForm.displayName, 'Props', this.props);
    const { appid, certid, token, runame
      , authorizeApi, oauth2Api, findingApi, tradingApi, inventoryApi, marketingApi, analyticsApi }
      = this.state;
    return <div className="pane">
    <form className="padded-less">
      <div className="form-group">
      <label>App ID</label>
      <input type="text"
        className="form-control"
        placeholder="Client ID"
        value={appid}
        onChange={this.handleChangeText.bind(this, 'appid')} />
      </div>
      <div className="form-group">
      <label>Cert ID</label>
      <input type="text"
        className="form-control"
        placeholder="Client Secret"
        value={certid}
        onChange={this.handleChangeText.bind(this, 'certid')} />
      </div>
      <div className="form-group">
      <label>User Token</label>
      <textarea
        className="form-control"
        placeholder="Token"
        value={token}
        onChange={this.handleChangeText.bind(this, 'token')} />
      </div>
      <div className="form-group">
      <label>RuName</label>
      <input type="text"
        className="form-control"
        placeholder="eBay Redirect URL name"
        value={runame}
        onChange={this.handleChangeText.bind(this, 'runame')} />
      </div>
      <div className="form-group">
      <label>Authorize API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={authorizeApi}
        onChange={this.handleChangeText.bind(this, 'authorizeApi')} />
      </div>
      <div className="form-group">
      <label>OAuth2 API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={oauth2Api}
        onChange={this.handleChangeText.bind(this, 'oauth2Api')} />
      </div>
      <div className="form-group">
      <label>Finding API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={findingApi}
        onChange={this.handleChangeText.bind(this, 'findingApi')} />
      </div>
      <div className="form-group">
      <label>Trading API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={tradingApi}
        onChange={this.handleChangeText.bind(this, 'tradingApi')} />
      </div>
      <div className="form-group">
      <label>Inventory API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={inventoryApi}
        onChange={this.handleChangeText.bind(this, 'inventoryApi')} />
      </div>
      <div className="form-group">
      <label>Marketing API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={marketingApi}
        onChange={this.handleChangeText.bind(this, 'marketingApi')} />
      </div>
      <div className="form-group">
      <label>Analytics API URL</label>
      <input type="text"
        className="form-control"
        placeholder="URL"
        value={analyticsApi}
        onChange={this.handleChangeText.bind(this, 'analyticsApi')} />
      </div>
      <div className="form-actions">
      <button type="submit" 
        className="btn btn-large btn-form btn-primary"
        onClick={this.handleChangeSave.bind(this)}>Save
      </button>
      </div>
    </form>
    </div>;
  }
}
AppForm.displayName = 'AppForm';
AppForm.defaultProps = { config: null };
AppForm.propTypes = {
  config : PropTypes.object.isRequired
};
export default AppForm;
