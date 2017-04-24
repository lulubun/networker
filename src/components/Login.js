import React from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import * as actions from '../actions/userActions';

let usernameInput = '';
let passwordInput = '';

export class Login extends React.Component {
  render() {
    return(
      <div>
        <p>Today is: {this.props.day}</p>
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
        <RaisedButton label="Enter" secondary={true} onTouchTap={(event) => {
          this.props.login(usernameInput, passwordInput)
        }}/>
        <br />
        <br/>
        <Link to={'/new_user'} className="Link"><RaisedButton label="Register" secondary={true} /></Link>
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
