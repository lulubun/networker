import React from 'react'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/contactActions';
import moment from 'moment';
import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';


let firstInput = '';
let lastInput = '';
let importantInput = false;
let companyInput = '';
let jobTitleInput = '';
let emailInput = '';
let phoneInput = '';
let meetDateInput = moment().format("MMM DD YYYY");
let notesInput = '';
let startDate = moment().add(14, 'days').calendar();
let dateNextInput = moment(startDate).format("MMM DD YYYY");


export class NewContact extends React.Component {
  render() {
    const user = this.props.params.user;
    return(
      <div className="new_contact">
        <Formsy.Form>
          <p>New Contact</p>
          <FormsyText
            name="firstNameInput"
            hintText="First Name"
            validations="isWords"
            validationError="please use only letters"
            onChange={(event, newValue) => {
            firstInput = newValue
          }}/><br />
          <FormsyText
            name="lastNameInput"
            hintText="Last Name"
            validations="isWords"
            validationError="please use only letters"
            onChange={(event, newValue) => {
            lastInput = newValue
          }}/><br />
          <FormsyCheckbox
          name="importantInput"
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Select if this is an important contact"
          onChange={(event, isInputChecked) => {
            console.log(isInputChecked);
            importantInput = isInputChecked
          }}
          />
          <FormsyText
            name="companyInput"
            hintText="Company"
            onChange={(event, newValue) => {
            companyInput = newValue
          }}/><br />
          <FormsyText
            name="jobTitleInput"
            hintText="Job Title"
            onChange={(event, newValue) => {
            jobTitleInput = newValue
          }}/><br />
          <FormsyText
            name="emailInput"
            hintText="Email"
            validations="isEmail"
            validationError="please enter a valid email address"
            onChange={(event, newValue) => {
            emailInput = newValue
          }}/><br />
          <FormsyText
            name="phoneInput"
            hintText="Phone Number"
            validations="isNumeric"
            validationError="please enter a valid phone number"
            onChange={(event, newValue) => {
            phoneInput = newValue
          }}/><br />
          <FormsyDate
            name="meetDateInput"
            floatingLabelText="Date of meeting this contact"
            onChange={(event, date) => {meetDateInput = moment(date).format("MMM DD YYYY")}}
          />
          <br />
          <FormsyText
            name="notesInput"
            hintText="Notes about this contact"
            multiLine={true}
            onChange={(event, newValue) => {
              notesInput = newValue
            }}/><br />
          <FormsyDate
            name="dateNextInput"
            floatingLabelText="Date for next follow up"
            onChange={(event, date) => {dateNextInput = moment(date).format("MMM DD YYYY")}}
          />
          <br />
          <RaisedButton label="Save Contact" primary={true}
            type="submit"
            onTouchTap={(event) => {
              if (firstInput == '' && lastInput == '') {
                alert("You must include a contact name")
              } else if (emailInput == '' && phoneInput == '') {
                alert("You must include one form of contact")
              } else {
                this.props.saveContact(user, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput);
              }
            }}
          />
        </Formsy.Form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveContact: (user, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput) => dispatch(actions.sendNewContact(user, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput))
})

export default connect(null, mapDispatchToProps)(NewContact);
