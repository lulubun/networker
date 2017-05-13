import React from 'react';
import Login from './Login';
import Landing from './Landing';
import LoginImg from './LoginImg';

class LoginContainer extends React.Component {

  render() {
    return (
      <div>
        <div className="loginContainer">
          <LoginImg />
          <Login />
          <Landing />
        </div>
      </div>
    );
  }
}

export default LoginContainer;
