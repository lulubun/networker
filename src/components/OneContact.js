import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { styles } from 'material-ui/styles';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import Past from './Past';
import * as actions from '../actions/contactActions';
import Paper from 'material-ui/Paper';
import Account_Circle from 'material-ui/svg-icons/action/account-circle';
import Work from 'material-ui/svg-icons/action/work';
import Email from 'material-ui/svg-icons/communication/mail-outline';
import Phone from 'material-ui/svg-icons/communication/phone';
import Notes from 'material-ui/svg-icons/action/info';
import Alarm from 'material-ui/svg-icons/action/alarm';

const style = {
  padding: 20,
  margin: 20,
};

export class OneContact extends React.Component {
  componentDidMount() {
    this.props.getOneContact(this.props.params.id);
  }
 render() {
  return(
    <div>
      <Paper style={style} zDepth={1}>
        <p><Account_Circle /> {this.props.first} {this.props.last}</p>
        <Checkbox
        checked={this.props.important}
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label="Important"
        />
        <p><Work /> {this.props.co}</p>
        <p><Phone /> {this.props.phone}</p>
        <p><Email /> {this.props.email}</p>
        <p><Notes /> {this.props.firstMeet}<br /> {this.props.meetInfo}</p>
        <RaisedButton label="Edit Contact Info"/>
      </Paper>
      <Paper style={style} zDepth={1}>
        <Alarm /><p>Appointment for Next Contact: {this.props.appointment}</p><RaisedButton label="Change" />
      </Paper>
      <Paper style={style} zDepth={1}>
      <form>
        <p>Record New Follow Up</p>
        <DatePicker hintText="Date" defaultDate={this.props.day} />
        <RadioButtonGroup name="contact" defaultSelected="not_light">
          <RadioButton
            value="call"
            label="Call"
          />
          <RadioButton
            value="email"
            label="Email"
          />
          <RadioButton
            value="meeting"
            label="Meeting"
          />
          <RadioButton
            value="other"
            label="Other"
          />
        </RadioButtonGroup>
        <TextField
          hintText="notes"
          floatingLabelText="notes"
        /><br />
        <RaisedButton label="Save Follow Up" />
      </form>
      </Paper>
      <Past />
    </div>
  )
 }
}

const mapStateToProps = (state, props) => ({
  appointment: state.ContactState.dateNext,
  first: state.ContactState.firstName,
  last: state.ContactState.lastName,
  important: state.ContactState.import,
  co: state.ContactState.company,
  job: state.ContactState.jobTitle,
  email: state.ContactState.email,
  phone: state.ContactState.phone,
  firstMeet: state.ContactState.meetDate,
  meetInfo: state.ContactState.meetNotes,
});

const mapDispatchToProps = (dispatch) => ({
  getOneContact: (linkId) => dispatch(actions.fetchWholeContact(linkId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OneContact);
