import React from 'react';
import ContactLink from './ContactLink';
import {connect} from 'react-redux';

class Contacts extends React.Component {

  render() {
    for (var i = 0; i < contactList.length; i++) {
      contactList.push(<ContactLink />)
    }
    return (
      <div>
        <div className="allContacts">
          {contactList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  contactList: state.ContactState.allContacts
});

export default connect(mapStateToProps)(Contacts);
