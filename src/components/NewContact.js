import React from 'react'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/contactActions';

let firstInput = '';
let lastInput = '';
let importantInput = false;
let companyInput = '';
let jobTitleInput = '';
let emailInput = '';
let phoneInput = '';
let meetDateInput = '';
let notesInput = '';
let dateNextInput = '';


export class NewContact extends React.Component {
  render() {
    return(
      <div className="new_contact">
        <form>
          <p>New Contact</p>
          <TextField
            id="firstNameInput"
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
          onCheck={(event, isInputChecked) => {
            importantInput = isInputChecked
          }}
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
          <DatePicker
            floatingLabelText="Date of meeting this contact"
            onChange={(event, date) => {meetDateInput = date}}
          />
          <br />
          <TextField
            hintText="Notes about this contact"
            multiLine={true}
            onChange={(event, newValue) => {
              notesInput = newValue
            }}/><br />
          <DatePicker
            floatingLabelText="Date for next follow up"
            onChange={(date) => {dateNextInput = date}}
          />
          <br />
          <RaisedButton label="Save Contact" primary={true}
            onTouchTap={(event) => {
              this.props.saveContact(firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput);
            }}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  day: state.ContactState.meetDate
});

const mapDispatchToProps = (dispatch) => ({
  saveContact: (firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput) => dispatch(actions.sendNewContact(firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewContact);
