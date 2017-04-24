import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Past from './Past';
import * as actions from '../actions/contactActions';
import Paper from 'material-ui/Paper';
import Email from 'material-ui/svg-icons/communication/mail-outline';
import Phone from 'material-ui/svg-icons/communication/phone';
import Alarm from 'material-ui/svg-icons/action/alarm';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import '../index.css';

const style = {
  padding: 20,
  margin: 20,
};

let typeInput = '';
let dateInput = '';
let contactNotesInput = '';
let pastId = 0;
let prettyDate = '';

export class OneContact extends React.Component {
  componentDidMount() {
    this.props.getOneContact(this.props.params.id);
  }
 render() {
   const contactId = this.props.params.id;
  return(
    <div>
      <Paper style={style} zDepth={1}>
        <p>{this.props.first} {this.props.last}</p>
        <Checkbox
        checked={this.props.important}
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        onCheck={(event, isInputChecked) => {
          this.props.changeHeart(contactId, isInputChecked)
        }} />
        <p>{this.props.co}</p>
        <p>{this.props.job}</p>
        <p className="phoneText"><Phone /> {this.props.phone}</p>
        <p className="emailText"><Email /> {this.props.email}</p>
        <p>Met this contact on: {this.props.firstMeet}</p>
        <p>Notes: {this.props.meetInfo}</p>
        <Link to={'/edit_contact/' + this.props.params.id} className="Link"><RaisedButton
          label="Edit Contact Info"/></Link>
      </Paper>
      <Paper style={style} zDepth={1} name="dateChanger">
        <p><Alarm />Follow up with this contact on {this.props.appointment}</p>
          <DatePicker hintText="Change" underlineStyle={{display: 'none'}} onChange={(event, date) => {
            let sendDate = moment(date).format("MMM Do YYYY");
            this.props.changeAppointment(contactId, sendDate)
          }}/>
      </Paper>
      <Link to={'/contacts'} className="Link"><RaisedButton label="Return to All Contacts" fullWidth={true} /></Link>
      <Paper style={style} zDepth={1}>
      <form>
        <p>Record New Follow Up</p>
        <DatePicker hintText="Date" onChange={(event, date) => {
          prettyDate = moment(date).format("MMM Do YYYY");
          dateInput = prettyDate;
        }} />
        <RadioButtonGroup name="contact" onChange={(event, value) => {
          typeInput = value;
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
            contactNotesInput = newValue;
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
  changeAppointment: (contactId, sendDate) => dispatch(actions.fetchDateUpdate(contactId, sendDate)),
  changeHeart: (contactId, isInputChecked) => dispatch(actions.fetchHeartUpdate(contactId, isInputChecked)),
  addPast: (contactId, pastId, dateInput, typeInput, contactNotesInput) => dispatch(actions.sendNewPast(contactId, pastId, dateInput, typeInput, contactNotesInput))
})

export default connect(mapStateToProps, mapDispatchToProps)(OneContact);
