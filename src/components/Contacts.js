import React from 'react';
import ContactLink from './ContactLink';
import {connect} from 'react-redux';

class Contacts extends React.Component {

  render() {
    for (var i = 0; i < this.props.contactList.length; i++) {
      this.props.contactList.push(<ContactLink />)
    }
    return (
      <div>
        <div className="allContacts">
          {this.props.contactList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  contactList: state.AllContactsState.allContacts
});

export default connect(mapStateToProps)(Contacts);
