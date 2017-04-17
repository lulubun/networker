import React from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

export class Login extends React.Component {
  render() {
    return(
      <div>
        <p>Today is: {this.props.day}</p>
        <p className="form_header">Log In to Networker</p><br />
        <br />
        <TextField
          className="usernameIP"
          hintText="Username"
        /><br />
        <TextField
          className="passwordIP"
          hintText="Password"
        /><br />
        <br />
        <RaisedButton label="Enter" secondary={true} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  day: state.ContactState.meetDate
});
export default connect(mapStateToProps)(Login);
