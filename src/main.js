import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App/App';
 
ReactDOM.render(
  <App />
, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./pages/App/App.js', () => {
    console.log('Accepting the updated App module!');
    App.updated();
  });
}
