import React              from 'react';
import PropTypes          from 'prop-types';
import { Container }      from 'flux/utils';
import ContainerConverter from 'Main/FluxContainerConverter';
import appStore           from 'Stores/appStore';
import AppAction          from 'Actions/AppAction';
import AppBody            from 'Components/AppBody/AppBody';
import Note               from 'Pages/Note/Note';
import Complete           from 'Pages/Complete/Complete';
import Products           from 'Pages/Products/Products';
import Tabs               from 'Components/Tabs/Tabs';
import Contents           from 'Components/Contents/Contents';
import GlobalHeader       from 'Components/GlobalHeader/GlobalHeader';
import GlobalFooter       from 'Components/GlobalFooter/GlobalFooter';
import ErrorBoundary      from 'Components/ErrorBoundary/ErrorBoundary';
import { log }            from 'Utilities/webutils';

class App extends React.Component {
  static getStores() {
    return [appStore];
  }

  static calculateState() {
    return appStore.getState();
  }

  componentDidMount() {
    log.info(App.displayName, 'prefetch', 'config');
    return AppAction.fetchConfig();
  }

  render() {
    log.info(App.displayName, 'State', this.state);
    const { title, selected, config } = this.state;
    return <div className="window">
        <ErrorBoundary>
          <GlobalHeader title={title} />
          <Tabs selected={selected}>
            <span label="Search of items"></span>
            <span label="Search of Completed items"></span>
            <span label="Search of Product IDs"></span>
            <span label="Preference"></span>
          </Tabs>
          <Contents selected={selected}>
            <Note />
            <Complete />
            <Products />
            <AppBody config={config}/>
          </Contents>
          <GlobalFooter />
        </ErrorBoundary>
      </div>
    ;
  }
}
App.displayName = 'App';
App.defaultProps = {};
App.propTypes = {};
export default Container.create(ContainerConverter.convert(App));
