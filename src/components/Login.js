import React from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import * as actions from '../actions/userActions';
import '../index.css';

export class Login extends React.Component {
  render() {
    let usernameInput = '';
    let passwordInput = '';
    const style={
      width: '100%',
      'marginBottom': '100px',
      'marginTop': '20px',
      textAlign: 'center',
      paddingLeft: '55px'
    };
    const buttonStyle={
      'width': '100px'
    }
    return(
      <div style={style} className="Login">
        <p className="form_header">Log In</p><br />
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
          type='password'
          onChange={(event, newValue) => {
          passwordInput = newValue
          }}
        /><br />
        <br />
        <RaisedButton label="Enter" style={buttonStyle} backgroundColor="#5D576B" labelColor="#F1F1EF" onTouchTap={(event) => {
          if (usernameInput === '') {
            alert("Username is required");
          } else if (passwordInput === '') {
            alert("Password is required")
          } else {
          this.props.login(usernameInput, passwordInput)
        }
        }}/>
        <br />
        <br/>
        <Link to={'/new_user'} className="Link"><RaisedButton label="Register" style={buttonStyle} backgroundColor="#5D576B" labelColor="#F1F1EF" /></Link>
        <br/>
        <br/>
        <RaisedButton label="Demo" style={buttonStyle} backgroundColor="#5D576B" labelColor="#F1F1EF" onTouchTap={(event) => {
          this.props.login('User', 'password')
        }
        }/>
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
