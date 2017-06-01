import React from 'react';
import Login from './Login';
import Landing from './Landing';
import LoginImg from './LoginImg';

class LoginContainer extends React.Component {

  render() {
    const style = {
      width: '100%',
      textAlign: 'center'
    }
    return (
      <div>
        <div className="loginContainer" style={style}>
          <LoginImg />
          <Login />
          <Landing />
        </div>
      </div>
    );
  }
}

export default LoginContainer;
