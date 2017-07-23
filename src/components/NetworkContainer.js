import React from 'react';
import Contacts from './Contacts';
import Jobs from './Jobs';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/contactActions';
import Columns from 'react-columns';


class NetworkContainer extends React.Component {
  componentDidMount() {
    const user = this.props.params.user;
    // this.props.getAllContacts(user);
    // this.props.getAllJobs(user);
  };
  render() {
    const style = {
      // width: '100%',
      // paddingTop: '-10px',
      // boxSizing: 'borderBox',
      textAlign: 'center',
      paddingR: 0,
    }

    const buttonStyle={
      // padding: 50,
      // marginTop: 50,
      // marginBottom: 50,
      // marginRight: 50,
      // marginLeft: 50,
      // textAlign: 'center',
      // width: '80%',
      // backgroundColor: "#5D576B",
    }

    return (
      <div>
        <div className="networkContainer" style={style}>
          <Columns columns="2">
            <Contacts user={this.props.params.user} />
            <Jobs user={this.props.params.user} />
          </Columns>
          <RaisedButton
            label="Log Out"
            // style={buttonStyle}
            fullWidth={true}
            backgroundColor="#5D576B" labelColor="#F1F1EF"
            onTouchTap={(event) => {this.props.logOutNow()}}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logOutNow: () => dispatch(actions.fetchLogOut()),
  // getAllJobs: (user) => dispatch(actions.fetchAllJobs(user)),
  // getAllContacts: (user) => dispatch(actions.fetchAllContacts(user))
})

export default connect (null, mapDispatchToProps)(NetworkContainer);
