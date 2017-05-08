import React from 'react';
import Login from './Login';
import Landing from './Landing';

class LoginContainer extends React.Component {

  render() {
    return (
      <div>
        <div className="loginContainer">
          <h1 className="title">Networker</h1>
          <Login />
          <img src="https://c1.staticflickr.com/9/8450/7975205041_7a5e4b65ff_b.jpg" className="otherImage"/>
          <Landing />
        </div>
      </div>
    );
  }
}

export default LoginContainer;
