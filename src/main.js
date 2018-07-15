import React      from 'react';
import { render } from 'react-dom';
import App        from 'Pages/App/App';
 
const rootEl = document.getElementById('app');
const renderRoot = () => {
  render(<App />, rootEl);
};

if (module.hot) {
  module.hot.accept('./pages/App/App.js', () => {
    setImmediate(() => {
      renderRoot();
    });
  });
};

renderRoot();
