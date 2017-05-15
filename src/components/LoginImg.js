import React from 'react';
import MediaQuery from 'react-responsive';


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
    };

    const smTitleStyle = {
      textAlign: 'center',
      paddingBottom: '30px',
      fontSize: '50px',
      fontStyle: 'oblique',
      letterSpacing: '5px',
      color: 'white',
      webkitTextStroke: '1px #5D576B',
      paddingRight: '20px',
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
