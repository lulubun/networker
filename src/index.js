import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import Control from './components/Control';
import Login from './components/Login';
import Contacts from './components/Contacts';
import OneContact from './components/OneContact';
import NewContact from './components/NewContact';
import ContactState from './reducers/ContactState';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const reducer = combineReducers({
  ContactState,
  routing: routerReducer
})

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store)

const Start = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Control}>
          <IndexRoute component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/new_contact" component={NewContact} />
          <Route path="/contacts" component={Contacts} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);


ReactDOM.render(
  <Start />,
  document.getElementById('root')
)
