import React from 'react';
import {Link} from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/alert/error';
import ActionFavoriteBorder from 'material-ui/svg-icons/alert/error-outline';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/jobActions';
import '../index.css';
import GoogleLogin from 'react-google-login';
import MediaQuery from 'react-responsive';

class Jobs extends React.Component {
  componentDidMount() {
    const user = this.props.params.user;
    this.props.getAllJobs(user);
  };

  render() {
    const user = this.props.params.user;

    const style = {
      height: 175,
      marginTop: 70,
      marginBottom: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: 30,
      paddingLeft: 60,
      width: '80%',
      display: 'block',
    };

    const styleMin = {
      height: 175,
      marginTop: 50,
      marginBottom: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 20,
      width: '70%',
      display: 'block',
    };

    const iconStyle = {
      position: 'relative',
      top: '6px',
      paddingRight: '15px'
    }

    const noneStyle = {
      textAlign: 'center',
      color: '#cbc8d2',
      marginTop: 60
    }

    if (this.props.jobList.length == 0) {
      return(
        <div>
          <div className="New_Button">
            <Link to={'/' + user + '/new_Job'} className="Link"><RaisedButton className="NewButton" label="Create a New Job" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
          </div>
          <h3 style={noneStyle}>Press the button above to add a new Job</h3>
          <Link to={'/' + user + '/network'} className="Link"><RaisedButton
            className="DoneButton" label="Back to Options" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF" style={{marginBottom: 0, position: 'fixed'}}/></Link>
        </div>
      )
    }

    return (
      <div className="Jobs">
        <div className="New_Button">
          <Link to={'/' + user + '/new_Job'} className="Link"><RaisedButton className="NewButton" label="Create a New Job" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF" style={{marginBottom: 20}}/></Link>
        </div>
        <div className="jobs-List">
        <MediaQuery query='(min-device-width: 1000px)'>
          {this.props.jobList.map((job, index) =>
            (<div className="oneLink" key={index}>
              <Paper style={style} zDepth={1} rounded={false} className="onePaper">
                  <Link to={'/' + user + '/one_Job/' + job._id} className="Link">
                    <Checkbox
                      checked={job.serImportant}
                      checkedIcon={<ActionFavorite />}
                      uncheckedIcon={<ActionFavoriteBorder />}
                      style={{paddingBottom: 15, margin: '0 auto'}}
                      label={job.serCompany}
                      labelStyle={{fontSize: '1.75em'}}
                    />
                  </Link>
                  <p style={{marginBottom: 40}}>Next Follow-Up: {job.serNextDate}</p>
             </Paper>
            </div>
          ))}
        </MediaQuery>
        <MediaQuery query='(max-device-width: 999px)'>
          {this.props.jobList.map((job, index) =>
            (<div className="oneLink" key={index}>
              <Paper style={styleMin} zDepth={1} rounded={false} className="onePaper">
              <Link to={'/' + user + '/one_Job/' + job._id} className="Link">
              <Checkbox
               checked={job.serImportant}
               checkedIcon={<ActionFavorite />}
               uncheckedIcon={<ActionFavoriteBorder />}
               style={{paddingBottom: 15, margin: '0 auto'}}
               label={job.serCompany}
               labelStyle={{fontSize: '1.75em'}}
               />
               </Link>
               <p style={{marginBottom: 40}}>Next Follow-Up: {job.serNextDate}</p>
             </Paper>
            </div>
          ))}
        </MediaQuery>
        </div>
        <Link to={'/' + user + '/network'} className="Link"><RaisedButton
          className="DoneButton" label="Back to Options" fullWidth={true} backgroundColor="#5D576B" labelColor="#F1F1EF"/></Link>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
