import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import PastJobs from './PastJobs';
import * as actions from '../../actions/jobActions';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import '../../index.css';
import '../../../node_modules/react-add-to-calendar/dist/react-add-to-calendar.min.css';
import JobCard from './JobCard';

let pastId = 0;
let prettyDate = '';

export class OneJob extends React.Component {

  state = {
    notes: '',
    type: '',
    date: moment().format("YYYY-MM-DD"),
    newOpen: false,
  }
  componentDidMount() {
    this.props.fetchWholeJob(this.props.params.id);
  }

  handleOpen = () => {
    this.setState({newOpen: true});
  };

  handleClose = () => {
    this.setState({newOpen: false});
  };

 render() {
  const jobId = this.props.params.id;
  const user = this.props.params.user;

  return(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Link to={'/' + user + '/Jobs'} className="Link"><RaisedButton label="Return to All Jobs" fullWidth backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      <JobCard {...this.props} user={user} jobId={jobId} />
      <RaisedButton
        label="Record New Follow Up"
        onClick={this.handleOpen}
        backgroundColor="#5D576B"
        labelColor="#F1F1EF"
        style={{
          margin: '0 0 1vh 0'
        }}
      />
      <Dialog
        title="Record of Follow Up"
        modal={false}
        open={this.state.newOpen}
        onRequestClose={this.handleClose}
      >
        <form>
        <DatePicker hintText="Date"
          value={this.state.date}
          onChange={(event, date) => {
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
          multiLine
          value={this.state.notes}
          onChange={(event, newValue) => {
            this.setState({notes: newValue})
          }}
        /><br />
        <RaisedButton label="Save Follow Up"
          backgroundColor="#5D576B" labelColor="#F1F1EF"
          onTouchTap={() => {
            pastId = Math.floor((Math.random() * 10000) + 1);
            if (this.state.type == '') {
              alert("Please include the type of contact made")
            } else {
              prettyDate = moment(this.state.date).format("MMM DD YYYY");
              this.props.addPast(user, jobId, pastId, prettyDate, this.state.type, this.state.notes,);
             this.setState({ notes: '', type: '', date: {}, newOpen: false })
            }
          }} />
        </form>
      </Dialog>
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
  fetchWholeJob: (linkId) => dispatch(actions.fetchWholeJob(linkId)),
  changeHeartDate: (user, jobId, isInputChecked, sendDate) => dispatch(actions.fetchHeartDateUpdate(user, jobId, isInputChecked, sendDate)),
  addPast: (user, jobId, pastId, dateInput, typeInput, JobNotesInput) => dispatch(actions.sendNewJobPast(user, jobId, pastId, dateInput, typeInput, JobNotesInput)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneJob);
