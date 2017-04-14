import React from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import * as actions from '../actions/contactActions';
import RaisedButton from 'material-ui/RaisedButton';

export class Login extends React.Component {
  componentDidMount() {
    this.props.getDay();
  };
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
  day: state.ContactState.date
});

const mapDispatchToProps = (dispatch) => ({
  getDay: () => dispatch(actions.setDate())
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
