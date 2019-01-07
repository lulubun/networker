import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as contactActions from '../actions/contactActions';
import * as jobActions from '../actions/jobActions';
import TodayList from './TodayList';



class NetworkContainer extends React.Component {
  componentDidMount() {
    const { params, getAllJobs, fetchContacts } = this.props;
    const user = params.user;
    getAllJobs(user);
    fetchContacts(user);
  };

  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      paddingRight: '10vw',
      textAlign: 'center',

    }

    const wholeStyle={
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

    }

    const buttonStyle={
      padding: '1vh 0 1vh 0',
      marginTop: '5vh',
      textAlign: 'center',
      width: '30vw',
      backgroundColor: "#5D576B",
    }

    const LogoutStyle={
      // padding: '1vh 0 1vh 0',
      marginTop: '7vh',
      textAlign: 'center',
      width: '30vw',
    }
    const {jobList, params, logOutNow} = this.props;
    return (
      <div style={wholeStyle}>
        <div style={style}>
          <Link to={'/' + params.user + '/jobs'} className="Link"><RaisedButton label="Jobs" style={buttonStyle} backgroundColor="#5D576B" labelColor="#F1F1EF" /></Link>
          <Link to={'/' + params.user + '/contacts'} className="Link"><RaisedButton label="Contacts" style={buttonStyle} backgroundColor="#5D576B" labelColor="#F1F1EF" /></Link>
          <RaisedButton
            label="Log Out" style={LogoutStyle} backgroundColor="#aaa5b6" labelColor="#F1F1EF"
            onTouchTap={() => {logOutNow()}}
          />
        </div>
        <TodayList todayList={jobList} user={params.user}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  jobList: state.AllJobsState.allJobs,
});

const mapDispatchToProps = (dispatch) => ({
  getAllJobs: (user) => dispatch(jobActions.fetchAllJobs(user)),
  fetchContacts: (user) => dispatch(contactActions.fetchAllContacts(user)),
  logOutNow: () => dispatch(contactActions.fetchLogOut())
})

export default connect (mapStateToProps, mapDispatchToProps)(NetworkContainer);
