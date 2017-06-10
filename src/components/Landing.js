import React from 'react';
import PropTypes from 'prop-types';
import Star from 'material-ui/svg-icons/action/stars';
import MediaQuery from 'react-responsive';
import '../../public/index.css'


class Landing extends React.Component {
  render() {
    const style={
      float: 'right',
      position: 'relative'
    }

    const starStyle={
      width: '50px',
      paddingLeft: '0'
    }

    const styleMin={
      fontSize: '10px',
      display: 'block',
      paddingLeft: '35px',
      paddingRight: '35px'
    }

    const starStyleMin={
      display: 'none'
    }

    return (
      <div>
      <MediaQuery query='(min-device-width: 1224px)'>
        <div style={style} className="Landing">
          <p><Star style={starStyle} className="star" color={"#5D576B"} />    &nbsp; Keep track of your network<Star style={starStyle} className="star" color={"#5D576B"} /></p>
          <p><Star style={starStyle} className="star" color={"#5D576B"} />    &nbsp; Add follow up reminders to your Google Calendar<Star style={starStyle} className="star" color={"#5D576B"} /></p>
          <p><Star style={starStyle} className="star" color={"#5D576B"} />    &nbsp; Record all of your interactions with contacts and take important notes<Star style={starStyle} className="star" color={"#5D576B"} /></p>
        </div>
      </MediaQuery>
      <MediaQuery query='(max-device-width: 1224px)'>
        <div style={styleMin} className="Landing">
          <p><Star style={starStyleMin} className="star" color={"#5D576B"} />Keep track of your network<Star style={starStyleMin} className="star" color={"#5D576B"} /></p>
          <p><Star style={starStyleMin} className="star" color={"#5D576B"} />Add follow up reminders to your Google Calendar<Star style={starStyleMin} className="star" color={"#5D576B"} /></p>
          <p><Star style={starStyleMin} className="star" color={"#5D576B"} />Record all of your interactions with contacts and take important notes<Star style={starStyleMin} className="star" color={"#5D576B"} /></p>
        </div>
      </MediaQuery>
      </div>
    )
  }
}

export default Landing;
