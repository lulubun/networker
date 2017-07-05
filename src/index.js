import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Route, Router, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import Control from './components/Control';
import LoginContainer from './components/LoginContainer';
import NetworkContainer from './components/NetworkContainer';
import Jobs from './components/Jobs';
import Contacts from './components/Contacts';
import OneContact from './components/OneContact';
import OneJob from './components/OneJob';
import EditContact from './components/EditContact';
import NewContact from './components/NewContact';
import EditJob from './components/EditJob';
import NewJob from './components/NewJob';
import ContactState from './reducers/ContactState';
import UsersState from './reducers/UsersState';
import AllContactsState from './reducers/AllContactsState';
import AllJobsState from './reducers/AllJobsState';
import JobState from './reducers/JobState';
import NewUser from './components/new_user';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const reducer = combineReducers({
  ContactState,
  AllContactsState,
  UsersState,
  JobState,
  AllJobsState,
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
          <IndexRoute component={LoginContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/new_user" component={NewUser} />
          <Route path="/:user/network" component={NetworkContainer} />
          <Route path="/:user/contacts" component={Contacts} />
          <Route path="/:user/one_contact/:id" component={OneContact} />
          <Route path="/:user/new_contact" component={NewContact} />
          <Route path="/:user/edit_contact/:id" component={EditContact} />
          <Route path="/:user/jobs" component={Jobs} />
          <Route path="/:user/one_job/:id" component={OneJob} />
          <Route path="/:user/new_job" component={NewJob} />
          <Route path="/:user/edit_job/:id" component={EditJob} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);


ReactDOM.render(
  <Start />,
  document.getElementById('root')
)
