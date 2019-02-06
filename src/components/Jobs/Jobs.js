import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {FlatButton, RaisedButton} from 'material-ui';
import * as actions from '../../actions/jobActions';
import '../../index.css';
import JobsTable from './JobsTable';

class Jobs extends React.Component {
  state = {
    showBool: false,
  }
  componentDidMount = () => {
    const user = this.props.params.user;
    this.props.getAllJobs(user);
  }
  
  render() {
    const { params, jobList, fetchWholeJob, updateHeart, router } = this.props;
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
            <Link to={'/' + user + '/new_Job'} className="Link">
              <FlatButton
                className="NewButton"
                label="Create a New Job"
                fullWidth
                backgroundColor="#5D576B"
                labelStyle={{ color: "#F1F1EF" }}
              />
            </Link>
          </div>
          <h3 style={noneStyle}>Press the button above to add a new Job</h3>
          <Link to={'/' + user + '/network'} className="Link">
            <FlatButton
              className="DoneButton"
              fullWidth
              label="Back to Options"
              backgroundColor="#5D576B"
              labelStyle={{ color: "#F1F1EF" }}
              style={{marginBottom: 0, position: 'fixed'}}
            />
          </Link>
        </div>
      )
    }

    const activeJobs = jobList.reduce((acc, j) => {
      const newAcc = acc;
      if (j.stage !== 'Inactive') {
        return newAcc.concat([j])
      }
      return newAcc;
    }, []);

    const buttonLabel = this.state.showBool ? 'Hide Inactive' : 'Show Inactive'
    const oneThird = (screen.width / 3) - 10;
    const buttonStyle = {width: `${oneThird}px`, borderRadius: '0px!', margin: '1vh, 0, 1vh, 0'}
    return (
      <div className="Jobs">
        <div className="New_Button" style={{ margin: '5vh, 0, 0, 0', display: 'flex', justifyContent: 'space-around', width: '100%'}}>
          <Link to={'/' + user + '/new_Job'} className="Link">
            <FlatButton
              className="NewButton"
              label="Create a New Job"
              backgroundColor="#5D576B"
              labelStyle={{ color: "#F1F1EF" }}
              style={buttonStyle}
              />
          </Link>
          <FlatButton
            className="HideButton"
            label={buttonLabel}
            backgroundColor="#5D576B"
            labelStyle={{ color: "#F1F1EF" }}
            style={buttonStyle}
            onClick={() => {
              this.setState({showBool: !this.state.showBool})
            }}
            />
          <Link to={'/' + user + '/network'} className="Link">
            <FlatButton
              className="DoneButton"
              label="Back to Options"
              backgroundColor="#5D576B"
              labelStyle={{ color: "#F1F1EF" }}
              style={buttonStyle}
              />
            </Link>
        </div>
        <div className="jobs-List" style={{ padding: '3vh, 0, 0, 0',}}>
          <JobsTable jobs={this.state.showBool ? jobList : activeJobs} selectJob={fetchWholeJob} updateHeart={updateHeart} user={user} router={router} />
        </div>
       
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  jobList: state.AllState.allJobs,
});

const mapDispatchToProps = (dispatch) => ({
  getAllJobs: (user) => dispatch(actions.fetchAllJobs(user)),
  fetchWholeJob: (linkId) => dispatch(actions.fetchWholeJob(linkId)),
  updateHeart: (user, jobId, isInputChecked, appDate) => dispatch(actions.fetchHeartDateUpdate(user, jobId, isInputChecked, appDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
