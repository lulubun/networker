import React from 'react';
import { styles } from 'material-ui/styles';
import {Link} from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';

export default function ContactLink(props) {
  if (props.important = true) {
    document.getElementyById('importantHeart').checked = true;
  } else {
    document.getElementyById('importantHeart').checked = false;
  }
  return (
    <div className="LinkList">
      <p>Appointment for Next Contact: {props.dateNext}</p>
      <Link to={'/one_contact/' + props.id}>name: {props.firstName} {props.lastName}</Link>
      <Checkbox
      id="importantHeart"
      disabled={true}
      checkedIcon={<ActionFavorite />}
      uncheckedIcon={<ActionFavoriteBorder />}
      label="Important"
      style={styles.checkbox}
      />
      <p>co: {this.props.conCompany}</p>
    </div>
  );
};
