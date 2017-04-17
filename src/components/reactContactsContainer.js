import React from 'react';
import Contacts from './reactContacts';
import * as actions from '../actions/allContactsActions';
import {connect} from 'react-redux';

export class ContactsContainer extends React.Component {
  componentDidMount() {
    this.props.getAllContacts();
  };
  render() {
    return (
      <div className="ContactsContainer">
  		<Contacts list={this.props.list} />
      </div>
  	)
  }
};

const mapStateToProps = (state,props) => ({
  list: state.AllContactsState.allContacts
})

const mapDispatchToProps = (dispatch) => ({
  getAllContacts: () => dispatch(actions.fetchAllContacts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer)
