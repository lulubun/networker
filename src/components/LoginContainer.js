import React from 'react';
import Login from './Login';
import LoginImg from './LoginImg';

class LoginContainer extends React.Component {

  render() {
    const style = {
      width: '100%',
      paddingTop: '-10px',
      boxSizing: 'borderBox'
    }
    return (
      <div>
        <div className="loginContainer" style={style}>
          <LoginImg />
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginContainer;
