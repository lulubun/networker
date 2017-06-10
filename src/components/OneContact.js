import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import ActionFavorite from 'material-ui/svg-icons/toggle/star';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/star-border';
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
import AddToCalendar from 'react-add-to-calendar';


const style = {
  padding: 20,
  margin: 20,
};

let typeInput = '';
let dateInput = moment().format("MMM DD YYYY");
let contactNotesInput = '';
let pastId = 0;
let prettyDate = '';

export class OneContact extends React.Component {

  state = {
    notes: '',
    type: '',
    date: {}
  }
  componentDidMount() {
    this.props.getOneContact(this.props.params.id);
  }
  componentWillUnmount() {
    this.props.hide()
  }
 render() {
  let loginStat = this.props.googleLogin;
  const contactId = this.props.params.id;
  const user = this.props.params.user;
  let dayNext = moment(this.props.appointment).format("YYYY-MM-DD");
  let overdue = "";
  if (dayNext < moment().format("YYYY-MM-DD")) {
    overdue = 'Following up with this contact is overdue!'
  }

  let pushEvent = {
    title: 'Follw up with ' + this.props.first + ' ' + this.props.last,
    startTime: dayNext,
    endTime: dayNext
  }

  const overdueStyle = {
    color: 'red',
    fontWeight: 'bold'
  };

  let icon = { textOnly: 'none' };

  return(
    <div>
      <Paper style={style} zDepth={1}>
        <p className="contactName">{this.props.first} {this.props.last}</p>
        <Checkbox
        label="Important"
        checked={this.props.important}
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        onCheck={(event, isInputChecked) => {
          const dateSend = this.props.appointment;
          this.props.changeHeartDate(user, contactId, isInputChecked, dateSend)
        }} />
        <p>{this.props.job} at {this.props.co}</p>
        <p className="phoneText"><Phone className="conIcon"/> {this.props.phone}</p>
        <p className="emailText"><Email className="conIcon"/> {this.props.email}</p>
        <p>Met this contact on: {this.props.firstMeet}</p>
        <p>Notes: {this.props.meetInfo}</p>
        <Link to={'/' + user + '/edit_contact/' + this.props.params.id} className="Link"><RaisedButton
          label="Edit Contact Info" backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      </Paper>
      <Link to={'/' + user + '/contacts'} className="Link"><RaisedButton label="Return to All Contacts" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      <Paper style={style} zDepth={1} name="dateChanger">
        <p style={overdueStyle}>{overdue}</p>
        <p><Alarm className="conIcon"/>Follow up with this contact on {this.props.appointment}</p>
          <DatePicker hintText="Change" underlineStyle={{display: 'none'}} onChange={(event, date) => {
            let sendDate = moment(date).format("MMM DD YYYY");
            let heart = this.props.important;
            this.props.changeHeartDate(user, contactId, heart, sendDate)
          }}/>
          <AddToCalendar
            style={{color: "#F1F1EF", paddingLeft: 10, paddingRight: 10}}
            event={pushEvent}
          />
      </Paper>
      <Paper style={style} zDepth={1}>
      <form>
        <p>Record New Follow Up</p>
        <DatePicker hintText="Date" value={this.state.date} onChange={(event, date) => {
          this.setState({date})
        }} />
        <RadioButtonGroup
          name="contact"
          valueSelected={this.state.type}
          onChange={(event, value) => {
            this.setState({type: value})
        }}
        value={this.state.type}>
          <RadioButton
            value="Call"
            label="Call"
          />
          <RadioButton
            value="Email"
            label="Email"
          />
          <RadioButton
            value="Meeting"
            label="Meeting"
          />
          <RadioButton
            value="Other"
            label="Other"
          />
        </RadioButtonGroup>
        <TextField
          hintText="notes"
          floatingLabelText="Notes"
          ref={(node) => this.notesText = node}
          multiLine={true}
          value={this.state.notes}
          onChange={(event, newValue) => {
            this.setState({notes: newValue})
          }}
        /><br />
        <RaisedButton label="Save Follow Up"
          backgroundColor="#5D576B" labelColor="#F1F1EF"
          onTouchTap={(event) => {
            pastId = Math.floor((Math.random() * 10000) + 1);
            if (this.state.type == '') {
              alert("Please include the type of contact made")
            } else {
              prettyDate = moment(this.state.date).format("MMM DD YYYY");
              this.props.addPast(user, contactId, pastId, prettyDate, this.state.type, this.state.notes);
             this.setState({ notes: '', type: '', date: {} })
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
  //changeAppointment: (user, contactId, sendDate) => dispatch(actions.fetchDateUpdate(user, contactId, sendDate)),
  changeHeartDate: (user, contactId, isInputChecked, appDate) => dispatch(actions.fetchHeartDateUpdate(user, contactId, isInputChecked, appDate)),
  addPast: (user, contactId, pastId, dateInput, typeInput, contactNotesInput) => dispatch(actions.sendNewPast(user, contactId, pastId, dateInput, typeInput, contactNotesInput)),
  runApiPush: (pushEvent) => dispatch(actions.pushToGoogle(pushEvent)),
  hide: () => dispatch(actions.cssHide())
})

export default connect(mapStateToProps, mapDispatchToProps)(OneContact);
