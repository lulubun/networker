import React from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/userActions';

let firstNameInput = '';
let lastNameInput = '';
let usernameInput = '';
let passwordInput = '';
let confirmPassword = '';

export class NewUser extends React.Component {
  render() {
    return(
      <div className="new_user_form">
        <form>
        <p className="form_header">Register to use Networker</p><br />
        <br />
        <TextField
          className="firstNameRegister"
          hintText="First Name"
          onChange={(event, newValue) => {
          firstNameInput = newValue
        }}/><br />
        <TextField
          className="lastNameRegister"
          hintText="Last Name"
          onChange={(event, newValue) => {
          lastNameInput = newValue
        }}/><br />
        <TextField
          className="userNameRegister"
          hintText="Username"
          onChange={(event, newValue) => {
          usernameInput = newValue
        }}/><br />
        <TextField
          className="passwordRegister"
          hintText="Password"
          onChange={(event, newValue) => {
          passwordInput = newValue
        }}/><br />
        <TextField
          className="confirmPasswordRegister"
          hintText="Confirm Password"
          onChange={(event, newValue) => {
          confirmPassword = newValue
        }}/><br />
        <RaisedButton label="Register" secondary={true}
        onTouchTap={(event) => {
          if (!(passwordInput === confirmPassword)) {
            alert('Password does not match')
          } else {
            this.props.saveUser(usernameInput, passwordInput, firstNameInput, lastNameInput)
          }
        }} />
      </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (usernameInput, passwordInput, firstNameInput, lastNameInput) => dispatch(actions.sendNewUser(usernameInput, passwordInput, firstNameInput, lastNameInput))
})

export default connect(null, mapDispatchToProps)(NewUser);
