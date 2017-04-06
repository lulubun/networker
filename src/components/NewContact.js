import React from 'react'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

export class NewContact extends React.Component {
  render() {
    return(
      <div className="new_contact">
        <form>
          <p>New Contact</p>
          <TextField
            hintText="First Name"
          /><br />
          <TextField
            hintText="Last Name"
          /><br />
          <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Select if this is an important contact"
          />
          <TextField
            hintText="Company"
          /><br />
          <TextField
            hintText="Job Title"
          /><br />
          <TextField
            hintText="Email"
          /><br />
          <TextField
            hintText="Phone Number"
          /><br />
          <TextField
            hintText="Where did you meet this person?"
          /><br />
          <TextField
            hintText="Notes about this contact"
          /><br />
          <DatePicker hintText="Next follow up" defaultDate = {this.props.day}/>
          <br />
          <RaisedButton label="Save Contact" primary={true} />
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps, null)(NewContact);
