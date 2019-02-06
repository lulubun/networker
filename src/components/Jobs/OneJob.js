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
import FollowUp from './FollowUp';

// let pastId = 0;
// let prettyDate = '';

export class OneJob extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props);
    this.state = {
      newOpen: false,
    };
  }
  componentWillMount() {
    const { allJobs, params } = this.props
    console.log('allJobs: ', allJobs);
    const  _id = params._id;
    const currentJob = allJobs.filter((j) => j._id === _id)[0]
    this.setState(currentJob)
  }

  handleOpen = () => {
    this.setState({newOpen: true});
  };

  handleClose = () => {
    this.setState({newOpen: false});
  };

 render() {
  const { addPast, params } = this.props;
  const jobId = params._id;
  const user = params.user;

  return(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Link to={'/' + user + '/Jobs'} className="Link"><RaisedButton label="Return to All Jobs" fullWidth backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      <JobCard {...this.state} user={user} jobId={jobId} />
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
        <FollowUp
          close={() => this.setState({ newOpen: false })}
          jobId={jobId}
          user={user}
          addPast={addPast}
        />
      </Dialog>
      <PastJobs />
    </div>
  )
 }
}

const mapStateToProps = (state, props) => ({
  allJobs: state.AllState.allJobs,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWholeJob: (linkId) => dispatch(actions.fetchWholeJob(linkId)),
  changeHeartDate: (user, jobId, isInputChecked, sendDate) => dispatch(actions.fetchHeartDateUpdate(user, jobId, isInputChecked, sendDate)),
  addPast: (user, jobId, pastId, dateOfContact, type, notes, newJobDate) => dispatch(actions.sendNewJobPast(user, jobId, pastId, dateOfContact, type, notes, newJobDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneJob);
