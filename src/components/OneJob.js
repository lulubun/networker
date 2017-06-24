import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import ActionFavorite from 'material-ui/svg-icons/toggle/star';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/star-border';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Past from './Past';
// import * as actions from '../actions/JobActions';
import Paper from 'material-ui/Paper';
import Alarm from 'material-ui/svg-icons/action/alarm';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import '../index.css';
import AddToCalendar from 'react-add-to-calendar';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import '../../node_modules/react-add-to-calendar/dist/react-add-to-calendar.min.css';
import MediaQuery from 'react-responsive';

const style = {
  padding: 20,
  margin: 20,
};

let pastId = 0;
let prettyDate = '';

export class OneJob extends React.Component {

  state = {
    notes: '',
    type: '',
    date: {}
  }
  componentDidMount() {
    this.props.getOneJob(this.props.params.id);
  }

 render() {
  const JobId = this.props.params.id;
  const user = this.props.params.user;
  let dayNext = moment(this.props.appointment).format("YYYY-MM-DD");
  let overdue = "";
  if (dayNext < moment().format("YYYY-MM-DD")) {
    overdue = 'Overdue:'
  }

  let pushEvent = {
    title: 'Follw up with ' + this.props.first + ' ' + this.props.last,
    startTime: dayNext,
    endTime: dayNext
  }

  let overdueStyle = {
    fontWeight: 'bold',
  }

  if (dayNext < moment().format("YYYY-MM-DD")) {
    overdueStyle = {
      color: 'red',
      fontWeight: 'bold'
    }
  }

  const nameStyle = {
    display: 'inline',
    position: 'relative'
  }

  let sentence = this.props.first + ' ' + this.props.last

  return(
    <div>
      <Link to={'/' + user + '/Jobs'} className="Link"><RaisedButton label="Return to All Jobs" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      <Paper style={style} zDepth={1}>
        <p className="JobName" style={nameStyle}>
          <Checkbox
          label={sentence}
          lablePosition='left'
          checked={this.props.important}
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={{float: 'right', paddingBottom: 30}}
          onCheck={(event, isInputChecked) => {
            const dateSend = this.props.appointment;
            this.props.changeHeartDate(user, JobId, isInputChecked, dateSend)
          }} />
        </p>
        <p>Job Title:   {this.props.job}</p>
        <p>Company:   {this.props.co}</p>
        <p className="phoneText">Phone Number:   {this.props.phone}</p>
        <p className="emailText">Email Address:   {this.props.email}</p>
        <p>Met this contact on:   {this.props.firstMeet}</p>
        <p>Notes:   {this.props.meetInfo}</p>
        <Link to={'/' + user + '/edit_Job/' + this.props.params.id} className="Link"><RaisedButton
          label="Edit" backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
        <div>
          <MediaQuery query='(min-device-width: 800px)'>
            <Toolbar style={{marginTop: 10}}>
              <ToolbarGroup firstChild={true} style={{paddingBottom: 10, paddingLeft: 15}}>
                <p style={overdueStyle}><Alarm className="conIcon" style={overdueStyle}/>{overdue} Follow up with this contact on {this.props.appointment}</p>
              </ToolbarGroup>
              <ToolbarGroup>
                <AddToCalendar
                  event={pushEvent}
                  buttonLabel="Add to Calendar"
                  buttonTemplate={{ 'caret': 'left' }}
                  displayItemIcons={false}
                />
                <ToolbarSeparator />
                <DatePicker hintText="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit Date" hintStyle={{color: 'black'}} underlineStyle={{display: 'none'}} onChange={(event, date) => {
                  let sendDate = moment(date).format("MMM DD YYYY");
                  let heart = this.props.important;
                  this.props.changeHeartDate(user, JobId, heart, sendDate)
                }}/>

              </ToolbarGroup>
            </Toolbar>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 799px)'>
            <p style={overdueStyle}><Alarm className="conIcon" style={overdueStyle}/>{overdue} Follow up with this Job on {this.props.appointment}</p>
          </MediaQuery>
        </div>
      </Paper>
      <Paper style={style} zDepth={1}>
      <form>
        <p>Record New Follow Up</p>
        <DatePicker hintText="Date" value={this.state.date} onChange={(event, date) => {
          this.setState({date})
        }} />
        <RadioButtonGroup
          name="Job"
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
              this.props.addPast(user, JobId, pastId, prettyDate, this.state.type, this.state.notes);
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
  appointment: state.JobState.dateNext,
  first: state.JobState.firstName,
  last: state.JobState.lastName,
  important: state.JobState.import,
  co: state.JobState.company,
  job: state.JobState.jobTitle,
  email: state.JobState.email,
  phone: state.JobState.phone,
  firstMeet: state.JobState.meetDate,
  meetInfo: state.JobState.meetNotes,
  googleLogin: state.JobState.login
});

const mapDispatchToProps = (dispatch) => ({
  // getOneJob: (linkId) => dispatch(actions.fetchWholeJob(linkId)),
  // //changeAppointment: (user, JobId, sendDate) => dispatch(actions.fetchDateUpdate(user, JobId, sendDate)),
  // changeHeartDate: (user, JobId, isInputChecked, appDate) => dispatch(actions.fetchHeartDateUpdate(user, JobId, isInputChecked, appDate)),
  // addPast: (user, JobId, pastId, dateInput, typeInput, JobNotesInput) => dispatch(actions.sendNewPast(user, JobId, pastId, dateInput, typeInput, JobNotesInput)),
  // runApiPush: (pushEvent) => dispatch(actions.pushToGoogle(pushEvent)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneJob);
