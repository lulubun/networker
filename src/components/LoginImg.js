import React from 'react';

class LoginImg extends React.Component {

  render() {
    const titleStyle = {
      textAlign: 'center',
      paddingBottom: '30px',
      fontSize: '110px',
      fontStyle: 'oblique',
      letterSpacing: '40px',
      color: 'white',
      webkitTextStroke: '1px #5D576B'
    }

    return (
      <div className="loginImg">
        <div>
          <h1 style={titleStyle}>Networker</h1>
        </div>
      </div>
    );
  }
}

export default LoginImg;
