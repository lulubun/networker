import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { styles } from 'material-ui/styles';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';


export class OneContact extends React.Component {
 render() {
  return(
    <div>
      <p>name: {this.props.first} {this.props.last}</p>
      <Checkbox
      checkedIcon={<ActionFavorite />}
      uncheckedIcon={<ActionFavoriteBorder />}
      label="Important"
      style={styles.checkbox}
      />
      <p>co: {this.props.company}</p>
      <p>p: {this.props.phone}</p>
      <p>e: {this.props.email}</p>
      <p>m: {this.props.meet}</p>
      <p>n: {this.props.note}</p>
      <p>Appointment for Next Contact: SERVERINFO</p><FlatButton label="Change" />
      <form>
        <p>Make Contact</p>
        <DatePicker hintText="Date" defaultDate={this.props.day} />
        <RadioButtonGroup name="contact" defaultSelected="not_light">
          <RadioButton
            value="call"
            label="Call"
            style={styles.radioButton}
          />
          <RadioButton
            value="email"
            label="Email"
            style={styles.radioButton}
          />
          <RadioButton
            value="meeting"
            label="Meeting"
            style={styles.radioButton}
          />
          <RadioButton
            value="other"
            label="Other"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </form>
      <p>Past Contact: {this.props.past}</p>
    </div>
  )
 }
}

const mapStateToProps = (state, props) => ({
  day: state.ContactState.date,
  appointment: state.ContactState.date
});

export default connect(mapStateToProps, null)(OneContact);
