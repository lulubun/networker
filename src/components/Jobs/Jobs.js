import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../actions/jobActions';
import '../../index.css';
import JobsTable from './JobsTable';

class Jobs extends React.Component {

  render() {
    const { params, jobList, handleClick, updateHeart, router } = this.props;
    const user = params.user;

    const noneStyle = {
      textAlign: 'center',
      color: '#cbc8d2',
      marginTop: 60
    }

    if (jobList.length == 0) {
      return(
        <div>
          <div className="New_Button">
            <Link to={'/' + user + '/new_Job'} className="Link"><RaisedButton className="NewButton" label="Create a New Job" fullWidth backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
          </div>
          <h3 style={noneStyle}>Press the button above to add a new Job</h3>
          <Link to={'/' + user + '/network'} className="Link"><RaisedButton
            className="DoneButton" label="Back to Options" fullWidth backgroundColor="#5D576B" labelColor="#F1F1EF" style={{marginBottom: 0, position: 'fixed'}}/></Link>
        </div>
      )
    }

    return (
      <div className="Jobs">
        <div className="New_Button" style={{ margin: '1vh, 0, 1vh, 0', height: '5vh'}}>
          <Link to={'/' + user + '/new_Job'} className="Link">
            <RaisedButton className="NewButton" label="Create a New Job" fullWidth backgroundColor="#5D576B" labelColor="#F1F1EF" style={{marginBottom: 10, zIndex: 5}}/>
          </Link>
        </div>
        <div className="jobs-List" style={{ padding: '100px, 0, 1vh, 0'}}>
          <JobsTable jobs={jobList} selectJob={handleClick} updateHeart={updateHeart} user={user} router={router} />
        </div>
        <Link to={'/' + user + '/network'} className="Link"><RaisedButton
          className="DoneButton" label="Back to Options" fullWidth backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  jobList: state.AllJobsState.allJobs,
});

const mapDispatchToProps = (dispatch) => ({
  getAllJobs: (user) => dispatch(actions.fetchAllJobs(user)),
  handleClick: (linkId) => dispatch(actions.fetchWholeJob(linkId)),
  updateHeart: (user, jobId, isInputChecked, appDate) => dispatch(actions.fetchHeartDateUpdate(user, jobId, isInputChecked, appDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
