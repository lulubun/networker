import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { styles } from 'material-ui/styles';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
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

let typeInput = '';
let dateInput = '';
let contactNotesInput = '';
let pastId = 0;

export class OneContact extends React.Component {
  componentDidMount() {
    this.props.getOneContact(this.props.params.id);
  }
 render() {
   const contactId = this.props.params.id;
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
        <p><Work /> {this.props.co}<br /> {this.props.job}</p>
        <p><Phone /> {this.props.phone}</p>
        <p><Email /> {this.props.email}</p>
        <p><Notes /> {this.props.firstMeet}<br /> {this.props.meetInfo}</p>
        <Link to={'/edit_contact/' + this.props.params.id}><RaisedButton
          label="Edit Contact Info"/></Link>
      </Paper>
      <Paper style={style} zDepth={1} id="dateChanger">
        <Alarm /><p>Appointment for Next Contact: {this.props.appointment}</p>
        <RaisedButton
          label="Change"
          onTouchTap={(event) => {
            //document.getElementById("dateChanger").innerHTML = '<DatePicker hintText="Select a New Date" />'
          }}
         />
      </Paper>
      <Paper style={style} zDepth={1}>
      <form>
        <p>Record New Follow Up</p>
        <DatePicker hintText="Date" defaultDate={this.props.day} onChange={(date) => {
          dateInput = date
        }} />
        <RadioButtonGroup name="contact" onChange={(event, value) => {
          typeInput = value
        }}>
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
          multiLine={true}
          onChange={(event, newValue) => {
            contactNotesInput = newValue
          }}
        /><br />
        <RaisedButton label="Save Follow Up"
          onTouchTap={(event) => {
            pastId = Math.floor((Math.random() * 10000) + 1);
            this.props.addPast(contactId, pastId, dateInput, typeInput, contactNotesInput);
          }} />
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
  getOneContact: (linkId) => dispatch(actions.fetchWholeContact(linkId)),
  addPast: (contactId, pastId, dateInput, typeInput, contactNotesInput) => dispatch(actions.sendNewPast(contactId, pastId, dateInput, typeInput, contactNotesInput))
})

export default connect(mapStateToProps, mapDispatchToProps)(OneContact);
