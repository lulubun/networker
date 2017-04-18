import React from 'react';
import ContactLink from './ContactLink';
import {connect} from 'react-redux';
import * as actions from '../actions/contactActions';


class Contacts extends React.Component {
  componentDidMount() {
    this.props.getAllContacts();
  };

  render() {
    const linkList = this.props.contactList.map(contact => {
      return <ContactLink />
    });
    return (
      <div className="Contacts-List">
        {linkList}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  contactList: state.ContactState.list
});

const mapDispatchToProps = (dispatch) => ({
  getAllContacts: () => dispatch(actions.fetchAllContacts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
