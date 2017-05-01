import React from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import * as actions from '../actions/userActions';
import '../index.css';
import moment from 'moment';

let usernameInput = '';
let passwordInput = '';

export class Login extends React.Component {
  render() {
    let today = moment().format('MMM DD YYYY')

    return(
      <div className="Login">
        <p className="formDate">Today is {today}</p>
        <p className="form_header">Log In to Networker</p><br />
        <br />
        <TextField
          className="usernameIP"
          hintText="Username"
          onChange={(event, newValue) => {
          usernameInput = newValue
          }}
        /><br />
        <TextField
          className="passwordIP"
          hintText="Password"
          onChange={(event, newValue) => {
          passwordInput = newValue
          }}
        /><br />
        <br />
        <RaisedButton label="Enter" backgroundColor="#5D576B" labelColor="#F1F1EF" onTouchTap={(event) => {
          if (usernameInput = '') {
            alert("Username is required");
          } else if (passwordInput = '') {
            alert("Password is required")
          } else {
          this.props.login(usernameInput, passwordInput)
        }
        }}/>
        <br />
        <br/>
        <Link to={'/new_user'} className="Link"><RaisedButton label="Register" backgroundColor="#5D576B" labelColor="#F1F1EF" /></Link>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  day: state.ContactState.meetDate
});

const mapDispatchToProps = (dispatch) => ({
  login: (usernameInput, passwordInput) => dispatch(actions.fetchOneUser(usernameInput, passwordInput))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
