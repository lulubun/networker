import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import ActionFavorite from 'material-ui/svg-icons/alert/error';
import ActionFavoriteBorder from 'material-ui/svg-icons/alert/error-outline';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import PastJobs from './PastJobs';
import * as actions from '../actions/jobActions';
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
    date: moment().format("YYYY-MM-DD")
  }
  componentDidMount() {
    this.props.getOneJob(this.props.params.id);
  }

 render() {
  const jobId = this.props.params.id;
  const user = this.props.params.user;
  let dayNext = moment(this.props.dateNext).format("YYYY-MM-DD");
  let overdue = "";
  if (dayNext < moment().format("YYYY-MM-DD")) {
    overdue = 'Overdue:'
  }

  let pushEvent = {
    title: 'Follw up with ' + this.props.co,
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

  return(
    <div>
      <Link to={'/' + user + '/Jobs'} className="Link"><RaisedButton label="Return to All Jobs" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      <Paper style={style} zDepth={1}>
        <div className="JobName" style={nameStyle}>
          <Checkbox
          label={this.props.co}
          labelPosition='left'
          checked={this.props.important}
          iconStyle={{width: '3em', height: '3em'}}
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          labelStyle={{float: 'right', paddingBottom: 10, fontSize: '3em', lineHeight: '100%'}}
          onCheck={(event, isInputChecked) => {
            const dateSend = this.props.dateNext;
            console.log(user, jobId, isInputChecked, dateSend);
            this.props.changeHeartDate(user, jobId, isInputChecked, dateSend)
          }} />
        </div>
        <p>Job Title:   {this.props.job}</p>
        {/* <Link to={'/' + user + '/one_contact/' + contact._id}}> */}
          <p>Contact:   {this.props.contactName}</p>
        {/* </Link> */}
        <p>Company website: {this.props.web}</p>
        <p>Job posting: {this.props.listing}</p>
        <p>Stage: {this.props.progress}</p>
        <p>Found out about this job on:  {this.props.foundDate}</p>
        <p>Research on company: {this.props.research}</p>
        <p>Notes:   {this.props.info}</p>
        <Link to={'/' + user + '/edit_job/' + this.props.params.id} className="Link"><RaisedButton
          label="Edit" backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
        <div>
          <MediaQuery query='(min-device-width: 1010px)'>
            <Toolbar style={{marginTop: 10}}>
              <ToolbarGroup firstChild={true} style={{paddingBottom: 10, paddingLeft: 15}}>
                <p style={overdueStyle}><Alarm className="conIcon" style={overdueStyle}/>{overdue} Follow up with this opportunity on {this.props.dateNext}</p>
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
                  console.log(sendDate, heart);
                  this.props.changeHeartDate(user, jobId, heart, sendDate)
                }}/>

              </ToolbarGroup>
            </Toolbar>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 1009px)'>
            <p style={overdueStyle}><Alarm className="conIcon" style={overdueStyle}/>{overdue} Follow up with this opportunity on {this.props.dateNext}</p>
            <DatePicker hintText="Edit Follow Date" hintStyle={{color: 'black', fontSize: '0.5em', border: '0.5px solid black', paddingLeft: 10, paddingRight: 10}} underlineStyle={{display: 'none'}} onChange={(event, date) => {
              let sendDate = moment(date).format("MMM DD YYYY");
              let heart = this.props.important;
              this.props.changeHeartDate(user, jobId, heart, sendDate)
            }}/>
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
          value="Interview"
          label="Interview"
        />
          <RadioButton
            value="Call"
            label="Call"
          />
          <RadioButton
            value="Email"
            label="Email"
          />
          <RadioButton
            value="Evaluation"
            label="Evaluation"
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
              this.props.addPast(user, jobId, pastId, prettyDate, this.state.type, this.state.notes,);
             this.setState({ notes: '', type: '', date: {} })
            }
          }} />
      </form>
      </Paper>
      <PastJobs />
    </div>
  )
 }
}

const mapStateToProps = (state, props) => ({
  co: state.JobState.companyState,
  job: state.JobState.jobTitleState,
  progress: state.JobState.stageState,
  dateNext: state.JobState.dateNextState,
  important: state.JobState.importState,
  contactName: state.JobState.contactState,
  foundDate: state.JobState.foundJobState,
  research: state.JobState.researchState,
  info: state.JobState.jobNotesState,
  web: state.JobState.websiteState,
  listing: state.JobState.postState
});

const mapDispatchToProps = (dispatch) => ({
  getOneJob: (linkId) => dispatch(actions.fetchWholeJob(linkId)),
  changeHeartDate: (user, jobId, isInputChecked, sendDate) => dispatch(actions.fetchHeartDateUpdate(user, jobId, isInputChecked, sendDate)),
  addPast: (user, jobId, pastId, dateInput, typeInput, JobNotesInput) => dispatch(actions.sendNewJobPast(user, jobId, pastId, dateInput, typeInput, JobNotesInput)),
  // runApiPush: (pushEvent) => dispatch(actions.pushToGoogle(pushEvent)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneJob);
