import React from 'react'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/contactActions';

export class EditContact extends React.Component {
  componentDidMount() {
    this.props.getOneContact(this.props.params.id);
  }
  render() {
    let editUser = this.props.params.user;
    let editId = this.props.params.id
    let firstInput = this.props.first;
    let lastInput = this.props.last;
    let importantInput = this.props.important;
    let companyInput = this.props.company;
    let jobTitleInput = this.props.jobTitle;
    let emailInput = this.props.email;
    let phoneInput = this.props.phone;
    let meetDateInput = this.props.meetDate;
    let notesInput = this.props.meetNotes;
    const dateStyle = {
      width: 100,
    };
    return(
      <div className="edit_contact">
        <form>
          <p>Edit Contact</p>
          <p>First Name:</p><TextField
            name="firstNameInput"
            onChange={(event, newValue) => {
            firstInput = newValue
          }}
            defaultValue={this.props.first}
          /><br />
          <p>Last Name:</p>
          <TextField
            name="lastNameInput"
            defaultValue={this.props.last}
            onChange={(event, newValue) => {
            lastInput = newValue
          }}/><br />
          <Checkbox
          id="checkHeart"
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Select if this is an important contact"
          checked={this.props.important}
          onCheck={(event, isInputChecked) => {
            if (isInputChecked == true) {
              isInputChecked == false
            } else {
              isInputChecked == true
            }
          }}
          />
          <p>Company:</p>
          <TextField
            name="companyInput"
            defaultValue={this.props.company} onChange={(event, newValue) => {
            companyInput = newValue
          }}/><br />
          <p>Job Title:</p>
          <TextField
            name="jobTitleInput"
            defaultValue={this.props.jobTitle} onChange={(event, newValue) => {
            jobTitleInput = newValue
          }}/><br />
          <p>Email:</p>
          <TextField
            name="emailInput"
            defaultValue={this.props.email} onChange={(event, newValue) => {
            emailInput = newValue
          }}/><br />
          <p>Phone:</p>
          <TextField
            name="phoneInput"
            defaultValue={this.props.phone} onChange={(event, newValue) => {
            phoneInput = newValue
          }}/><br />
          <DatePicker
            floatingLabelText={"Date of meeting this contact " + meetDateInput}
            style={dateStyle}
            defaultDate={this.props.meetDateInput}
            onChange={(event, date) => {
              meetDateInput = date;
            }}
          />
          <br />
          <p>Notes:</p>
          <TextField
            name="meetingNotes"
            defaultValue={this.props.meetNotes}
            multiLine={true}
            onChange={(event, newValue) => {
              notesInput = newValue
            }}/>
          <br />
          <RaisedButton label="Save Edits" backgroundColor="#5D576B" labelColor="#F1F1EF"
            onTouchTap={(event) => {
                this.props.editContact(editUser, editId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput);
            }}
          />
          <br />
          <br />
          <RaisedButton label="Delete Contact" backgroundColor="#5D576B" labelColor="#F1F1EF"
            onTouchTap={(event) => {
              const doubleCheck = confirm("Are you sure?");
              if (doubleCheck == true) {
                this.props.delete(editId, editUser);
              }
            }}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  first: state.ContactState.firstName,
  last: state.ContactState.lastName,
  important: state.ContactState.import,
  company: state.ContactState.company,
  jobTitle: state.ContactState.jobTitle,
  email: state.ContactState.email,
  phone: state.ContactState.phone,
  meetDate: state.ContactState.meetDate,
  meetNotes: state.ContactState.meetNotes
});

const mapDispatchToProps = (dispatch) => ({
  getOneContact: (linkId) => dispatch(actions.fetchWholeContact(linkId)),
  editContact: (editUser, editId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput) => dispatch(actions.fetchUpdate(editUser, editId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput)),
  delete: (editId, editUser) => dispatch(actions.fetchDeleteContact(editId, editUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
