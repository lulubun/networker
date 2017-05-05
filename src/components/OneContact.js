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
let dateInput = moment().format("MMM DD YYYY");
let contactNotesInput = '';
let pastId = 0;
let prettyDate = '';

//If login is true, render a button to add an event, else disable button? CallAPI

export class OneContact extends React.Component {
  componentDidMount() {
    this.props.getOneContact(this.props.params.id);
  }
 render() {
  const contactId = this.props.params.id;
  const user = this.props.params.user;
  let dayNext = moment(this.props.appointment).format("YYYY-MM-DD");
  var event = {
    'summary': 'Follw up with' + this.props.first + this.props.last,
    'start': {
      'date': dayNext
    },
    'end': {
    'date': dayNext
  }
};
  return(
    <div>
      <Paper style={style} zDepth={1}>
        <p>{this.props.first} {this.props.last}</p>
        <Checkbox
        checked={this.props.important}
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        onCheck={(event, isInputChecked) => {
          console.log(isInputChecked);
          this.props.changeHeart(user, contactId, isInputChecked)
        }} />
        <p>{this.props.co}</p>
        <p>{this.props.job}</p>
        <p className="phoneText"><Phone /> {this.props.phone}</p>
        <p className="emailText"><Email /> {this.props.email}</p>
        <p>Met this contact on: {this.props.firstMeet}</p>
        <p>Notes: {this.props.meetInfo}</p>
        <Link to={'/' + user + '/edit_contact/' + this.props.params.id} className="Link"><RaisedButton
          label="Edit Contact Info" backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      </Paper>
      <Paper style={style} zDepth={1} name="dateChanger">
        <p><Alarm />Follow up with this contact on {this.props.appointment}</p>
          <DatePicker hintText="Change" underlineStyle={{display: 'none'}} onChange={(event, date) => {
            let sendDate = moment(date).format("MMM DD YYYY");
            this.props.changeAppointment(user, contactId, sendDate)
          }}/>
          <RaisedButton
            label="Add to Google Calendar" backgroundColor="#5D576B" labelColor="#F1F1EF"
            onTouchTap= //ADD API STUFF HERE!!!!!!!!!!!!!
          />
      </Paper>
      <Link to={'/' + user + '/contacts'} className="Link"><RaisedButton label="Return to All Contacts" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      <Paper style={style} zDepth={1}>
      <form>
        <p>Record New Follow Up</p>
        <DatePicker hintText="Date" onChange={(event, date) => {
          prettyDate = moment(date).format("MMM DD YYYY");
          dateInput = prettyDate;
        }} />
        <RadioButtonGroup name="contact"
          onChange={(event, value) => {
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
          ref={(node) => this.notesText = node}
          multiLine={true}
          onChange={(event, newValue) => {
            contactNotesInput = newValue;
          }}
        /><br />
        <RaisedButton label="Save Follow Up"
          backgroundColor="#5D576B" labelColor="#F1F1EF"
          onTouchTap={(event) => {
            pastId = Math.floor((Math.random() * 10000) + 1);
            if (typeInput == '') {
              alert("Please include the type of contact made")
            } else {
              console.log(contactId, user, pastId);
              this.props.addPast(user, contactId, pastId, dateInput, typeInput, contactNotesInput);
            //  this.notesText.setState({ value: "" })
            }
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
  googleLogin: state.ContactState.login
});

const mapDispatchToProps = (dispatch) => ({
  getOneContact: (linkId) => dispatch(actions.fetchWholeContact(linkId)),
  changeAppointment: (user, contactId, sendDate) => dispatch(actions.fetchDateUpdate(user, contactId, sendDate)),
  changeHeart: (user, contactId, isInputChecked) => dispatch(actions.fetchHeartUpdate(user, contactId, isInputChecked)),
  addPast: (user, contactId, pastId, dateInput, typeInput, contactNotesInput) => dispatch(actions.sendNewPast(user, contactId, pastId, dateInput, typeInput, contactNotesInput))
})

export default connect(mapStateToProps, mapDispatchToProps)(OneContact);
