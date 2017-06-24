import React from 'react';
// import Contacts from './Contacts';
// import Jobs from './Jobs';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/contactActions'


class NetworkContainer extends React.Component {

  render() {
    const style = {
      width: '100%',
      // paddingTop: '-10px',
      boxSizing: 'borderBox',
      textAlign: 'center',

    }

    const buttonStyle={
      padding: 50,
      marginTop: 50,
      marginBottom: 50,
      marginRight: 50,
      marginLeft: 50,
      textAlign: 'center',
      width: '80%',
      backgroundColor: "#5D576B",
    }

    return (
      <div>
        <div className="networkContainer" style={style}>
          <Link to={'/' + this.props.params.user + '/jobs'} className="Link"><RaisedButton label="Follow up on Jobs" style={buttonStyle} backgroundColor="#5D576B" labelColor="#F1F1EF" /></Link>
          <Link to={'/' + this.props.params.user + '/contacts'} className="Link"><RaisedButton label="Follow up on Contacts" style={buttonStyle} backgroundColor="#5D576B" labelColor="#F1F1EF" /></Link>
          <RaisedButton
            label="Log Out" style={buttonStyle} backgroundColor="#5D576B" labelColor="#F1F1EF"
            onTouchTap={(event) => {this.props.logOutNow()}}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logOutNow: () => dispatch(actions.fetchLogOut())
})

export default connect (null, mapDispatchToProps)(NetworkContainer);
