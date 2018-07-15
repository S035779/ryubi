import React      from 'react';
import PropTypes  from 'prop-types';
import AppSidebar from 'Components/AppSidebar/AppSidebar';
import AppForm    from 'Components/AppForm/AppForm';
import { log }    from 'Utilities/webutils';

class AppBody extends React.Component {
  render() {
    const { config } = this.props;
    return <div className="pane-group">
      <AppSidebar />
      <AppForm config={config}/>
    </div>;
  }
};
AppBody.displayName = 'AppBody';
AppBody.defaultProps = { config: null };
AppBody.propTypes = {
  config: PropTypes.object.isRequired
};
export default AppBody;
