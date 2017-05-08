import React from 'react';
import Star from 'material-ui/svg-icons/action/stars'

class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <p><Star className="star" color={"#5D576B"} />Keep track of your network</p>
        <p><Star className="star" color={"#5D576B"} />Add follow up reminders to your Google Calendar</p>
        <p><Star className="star" color={"#5D576B"} />Record all of your interactions with contacts and take important notes</p>
      </div>
    )
  }
}

export default Landing;
