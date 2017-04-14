import React from 'react'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

let firstInput = '';
let lastInput = '';
let companyInput = '';
let jobTitleInput = '';
let emailInput = '';
let phoneInput = '';
let dateInput = '';
let notesInput = '';

export class NewContact extends React.Component {
  render() {
    return(
      <div className="new_contact">
        <form>
          <p>New Contact</p>
          <TextField
            hintText="First Name" onChange={(event, newValue) => {
            firstInput = newValue
          }}/><br />
          <TextField
            hintText="Last Name" onChange={(event, newValue) => {
            lastInput = newValue
          }}/><br />
          <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Select if this is an important contact"
          />
          <TextField
            hintText="Company" onChange={(event, newValue) => {
            companyInput = newValue
          }}/><br />
          <TextField
            hintText="Job Title" onChange={(event, newValue) => {
            jobTitleInput = newValue
          }}/><br />
          <TextField
            hintText="Email" onChange={(event, newValue) => {
            emailInput = newValue
          }}/><br />
          <TextField
            hintText="Phone Number" onChange={(event, newValue) => {
            phoneInput = newValue
          }}/><br />
          <TextField
            defaultValue= {this.props.today} onChange={(event, newValue) => {
            dateInput = newValue
          }}/><br />
          <TextField
            hintText="Notes about this contact" onChange={(event, newValue) => {
            notesInput = newValue
          }}/><br />
          <DatePicker hintText="Next follow up" defaultDate = {this.props.day}/>
          <br />
          <RaisedButton label="Save Contact" primary={true} />
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
  day: state.ContactState.meetDate
});

export default connect(mapStateToProps)(NewContact);
