import React from 'react';
import { styles } from 'material-ui/styles';
import {Link} from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import * as actions from '../actions/contactActions';



export class ContactLink extends React.Component {
  render() {
    return(
      <div className="LinkList">
         <p>Appointment for Next Contact: {this.props.appointment}</p>
         <Link to={'/one_contact/' + this.props.id}>name: {this.props.first} {this.props.last}</Link>
         <Checkbox
         id="importantHeart"
         checked={this.props.importantHeart}
         disabled={true}
         checkedIcon={<ActionFavorite />}
         uncheckedIcon={<ActionFavoriteBorder />}
         label="Important"
         style={styles.checkbox}
         />
         <p>co: {this.props.conCompany}</p>
      </div>
    )
  }
};

const mapStateToProps = (state, props) => ({
  id: state.ContactState.id,
  all: state.AllContactsState.allContacts,
  appointment: state.ContactState.dateNext,
  first: state.ContactState.firstName,
  last: state.ContactState.lastName,
  conCompany: state.ContactState.company,
  importantHeart: state.ContactState.important
});

export default connect(mapStateToProps)(ContactLink);
