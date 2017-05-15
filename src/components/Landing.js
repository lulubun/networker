import React from 'react';
import Star from 'material-ui/svg-icons/action/stars';
import MediaQuery from 'react-responsive';


class Landing extends React.Component {
  render() {
    const style={
      'paddingLeft': '20px'
    }

    const starStyle={
      width: '50px'
    }

    const styleMin={
      display: 'block',
      paddingLeft: '25px',
      paddingRight: '35px'
    }

    const starStyleMin={
      display: 'none'
    }

    return (
      <div>
      <MediaQuery query='(min-device-width: 1224px)'>
        <div style={style} className="Landing">
          <p><Star style={starStyle} className="star" color={"#5D576B"} />Keep track of your network</p>
          <p><Star style={starStyle} className="star" color={"#5D576B"} />Add follow up reminders to your Google Calendar</p>
          <p><Star style={starStyle} className="star" color={"#5D576B"} />Record all of your interactions with contacts and take important notes</p>
        </div>
      </MediaQuery>
      <MediaQuery query='(max-device-width: 1224px)'>
        <div style={styleMin} className="Landing">
          <p><Star style={starStyleMin} className="star" color={"#5D576B"} />Keep track of your network</p>
          <p><Star style={starStyleMin} className="star" color={"#5D576B"} />Add follow up reminders to your Google Calendar</p>
          <p><Star style={starStyleMin} className="star" color={"#5D576B"} />Record all of your interactions with contacts and take important notes</p>
        </div>
      </MediaQuery>
      </div>
    )
  }
}

export default Landing;
