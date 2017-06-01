import React from 'react';
import MediaQuery from 'react-responsive';


class LoginImg extends React.Component {

  render() {
    const titleStyle = {
      textAlign: 'center',
      paddingBottom: '30px',
      fontSize: '110px',
      fontStyle: 'oblique',
      letterSpacing: '15px',
      color: 'white',
      'WebkitTextStroke': '1px #5D576B'
    };

    const smTitleStyle = {
      textAlign: 'center',
      paddingBottom: '30px',
      fontSize: '30px',
      fontStyle: 'oblique',
      letterSpacing: '3px',
      color: 'white',
      'WebkitTextStroke': '1px #5D576B',
    };

    return (
      <div className="loginImg">
        <MediaQuery query='(min-device-width: 1224px)'>
        <div>
          <h1 style={titleStyle}>Networker</h1>
        </div>
      </MediaQuery>
      <MediaQuery query='(max-device-width: 1224px)'>
      <div>
        <h1 style={smTitleStyle}>Networker</h1>
      </div>
    </MediaQuery>
      </div>
    );
  }
}

export default LoginImg;
