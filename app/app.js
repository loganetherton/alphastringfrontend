/**
 * app entry point
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/font-awesome/css/font-awesome.css';
import 'sanitize.css/sanitize.css';
import './styles/simple-line-icons/css/simple-line-icons.css';
import './styles/animate.css/animate.min.css';
import './styles/whirl/dist/whirl.css';
import './styles/weather-icons/css/weather-icons.min.css';

import 'jquery-ui-bundle';
import 'imports-loader?jQuery=jquery!jquery-color/jquery.color.js';

// import './styles/app_original.css';
// import './styles/additional_modifications.css';
// Import root
import Root from 'containers/Root';
// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/Root/selectors';
// Load the favicon and the manifest.json file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import configureStore from './store';
// Import CSS reset and Global Styles
import './global-styles';

// Import root routes
import createRoutes from './routes';
// Get rid of this ASAP
window.$ = window.jQuery = require('jquery');
/* eslint-enable import/no-unresolved, import/extensions */

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

export default store;

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the Root component
const rootRoute = {
  component: Root,
  childRoutes: createRoutes(store),
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={rootRoute}
        render={
          // Scroll to top when going to a new page, imitating default browser
          // behaviour
          applyRouterMiddleware(useScroll())
        }
      />
    </Provider>,
    document.getElementById('smartadmin-root')
  );
};

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
