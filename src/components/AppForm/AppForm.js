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
    , token:      config.token      ? config.token      : ''
    , findingApi: config.findingApi ? config.findingApi : ''
    , tradingApi: config.tradingApi ? config.tradingApi : ''
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
    const { appid, token, findingApi, tradingApi } = this.state;
    return <div className="pane">
    <form className="padded-less">
      <div className="form-group">
      <label>Application Key ID</label>
      <input type="text"
        className="form-control"
        placeholder="Key ID"
        value={appid}
        onChange={this.handleChangeText.bind(this, 'appid')} />
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
