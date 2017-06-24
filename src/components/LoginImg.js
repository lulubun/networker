import React from 'react';
import Star from 'material-ui/svg-icons/action/stars';
import MediaQuery from 'react-responsive';
// import Landing from './Landing';
import Background from '../../public/n_Fotor.jpg';
import Columns from 'react-columns';
import '../../public/index.css';


class LoginImg extends React.Component {

  render() {

    const starStyle={
      width: '50px',
      paddingLeft: '0'
    }


    const titleStyle = {
      fontStyle: 'oblique',
      color: 'white',
      'WebkitTextStroke': '1px #5D576B',
      width: '30%',
      fontSize: '65px',
      paddingTop: '30px',
      paddingLeft: '30px'
    };

    const backgroundStyle = {
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      boxSizing: 'borderBox'

    }

    const smTitleStyle = {
      textAlign: 'center',
      paddingBottom: '30px',
      fontSize: '30px',
      fontStyle: 'oblique',
      letterSpacing: '3px',
      color: 'white',
      'WebkitTextStroke': '1px #5D576B',
      paddingTop: '20px'
    };

    const landingStyle = {
      color: 'white',
      minWidth: '700px',
      paddingLeft: '10xp'
    }

    const textStyle ={
      paddingBottom: '30px'
    }

    return (
      <div style={backgroundStyle}>
        <MediaQuery query='(min-device-width: 1200px)'>
          <div style={textStyle}>
            <Columns>
            <h1 style={titleStyle}>Networker</h1>
            <div className="Landing" style={landingStyle}>
              <p><Star style={starStyle} className="star" color={'white'} /> Keep track of your network</p>
              <p><Star style={starStyle} className="star" color={'white'} /> Add follow up reminders to your Google Calendar</p>
              <p><Star style={starStyle} className="star" color={'white'} /> Record all of your interactions with contacts and take important notes</p>
            </div>
          </Columns>
          </div>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1199px)'>
          <div style={textStyle}>
            <h1 style={smTitleStyle}>Networker</h1>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

export default LoginImg;
