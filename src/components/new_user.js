import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/userActions';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';



let firstNameInput = '';
let lastNameInput = '';
let usernameInput = '';
let passwordInput = '';
let confirmPassword = '';

export class NewUser extends React.Component {
  render() {
    const style = {
      padding: 20,
      margin: 20,
      textAlign: 'center'
    };
    return(
      <div className="new_user_form">
        <Paper style={style} zDepth={5} rounded={false} className="onePaper">

        <form>
        <p className="form_header">Register to use Networker</p><br />
        <br />
        <TextField
          className="firstNameRegister"
          hintText="First Name"
          fullWidth={true}
          onChange={(event, newValue) => {
          firstNameInput = newValue
        }}/><br />
        <TextField
          className="lastNameRegister"
          fullWidth={true}
          hintText="Last Name"
          onChange={(event, newValue) => {
          lastNameInput = newValue
        }}/><br />
        <TextField
          className="userNameRegister"
          hintText="Username"
          fullWidth={true}
          onChange={(event, newValue) => {
          usernameInput = newValue
        }}/><br />
        <TextField
          className="passwordRegister"
          hintText="Password"
          type={"password"}
          fullWidth={true}
          onChange={(event, newValue) => {
          passwordInput = newValue
        }}/><br />
        <TextField
          className="confirmPasswordRegister"
          hintText="Confirm Password"
          type={"password"}
          fullWidth={true}
          onChange={(event, newValue) => {
          confirmPassword = newValue
        }}/><br />
        <RaisedButton label="Register" backgroundColor="#5D576B" labelColor="#F1F1EF" style={{marginRight: '10px'}}
        onTouchTap={(event) => {
          if (!(passwordInput === confirmPassword)) {
            alert('Password does not match')
          } else {
            this.props.saveUser(usernameInput, passwordInput, firstNameInput, lastNameInput)
          }
        }} />
        <Link to={'/'} className="Link"><RaisedButton label="Cancel" backgroundColor="#5D576B" labelColor="#F1F1EF" /></Link>
      </form>
    </Paper>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (usernameInput, passwordInput, firstNameInput, lastNameInput) => dispatch(actions.sendNewUser(usernameInput, passwordInput, firstNameInput, lastNameInput))
})

export default connect(null, mapDispatchToProps)(NewUser);
