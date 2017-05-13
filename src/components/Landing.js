import React from 'react';
import Star from 'material-ui/svg-icons/action/stars'

class Landing extends React.Component {
  render() {
    const style={
      'paddingLeft': '20px'
    }
    const starStyle={
      width: '50px'
    }
    return (
      <div style={style} className="Landing">
        <p><Star style={starStyle} className="star" color={"#5D576B"} />Keep track of your network</p>
        <p><Star style={starStyle} className="star" color={"#5D576B"} />Add follow up reminders to your Google Calendar</p>
        <p><Star style={starStyle} className="star" color={"#5D576B"} />Record all of your interactions with contacts and take important notes</p>
      </div>
    )
  }
}

export default Landing;
