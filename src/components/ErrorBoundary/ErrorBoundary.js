import React      from 'react';
import PropTypes  from 'prop-types';
import { log }    from 'Utilities/webutils';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    log.error(ErrorBoundary.displayName, error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      return <div><h2>Something went wrong.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
        {this.state.error && this.state.error.toString()}
        <br />
        {this.state.errorInfo.componentStack}
        </details>
      </div>;
    }
    return this.props.children;
  }
};
ErrorBoundary.displayName = 'ErrorBoundary';
ErrorBoundary.defaultProps = {};
ErrorBoundary.propTypes = {};
export default ErrorBoundary;
