import React from 'react'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/contactActions';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import MediaQuery from 'react-responsive';

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
      width: '100%',
      color: "#5D576B"
    };

    const styleLeft = {
      width: '46%',
      padding: 20,
      margin: 20,
      minHeight: 500
    };

    const styleRight = {
      width: '46%',
      padding: 20,
      margin: 20,
      minHeight: 500

    };

    const styleBoth = {
      padding: 20,
      margin: 20
    }

    const titleStyle = {
      marginLeft: 40,
      color: "#5D576B"

    }

    const pad = {
      marginLeft: 10,
      marginRight: 10
    }

    const push = {
      marginTop: 26
    }

    const color = {
      color: "#5D576B"
    }

    return(
      <div className="edit_contact">
          <h3 style={titleStyle}>Edit Contact</h3>
          <MediaQuery query='(min-device-width: 1000px)'>
          <form>
            <div className="papers">
            <Paper style={styleLeft} zDepth={5} rounded={false} className="onePaper">
                  <p style={color}>First Name:</p>
                  <TextField
                    name="firstNameInput"
                    fullWidth= {true}
                    onChange={(event, newValue) => {
                    firstInput = newValue
                  }}
                    defaultValue={this.props.first}
                  />
                  <p style={color}>Company:</p>
                  <TextField
                  name="companyInput"
                  fullWidth= {true}
                  defaultValue={this.props.company} onChange={(event, newValue) => {
                    companyInput = newValue
                  }}/>
                  <p style={color}>Email:</p>
                  <TextField
                    name="emailInput"
                    fullWidth= {true}
                    defaultValue={this.props.email} onChange={(event, newValue) => {
                    emailInput = newValue
                  }}/>
                  <DatePicker
                    floatingLabelText={"Date of meeting this contact " + meetDateInput}
                    style={dateStyle}
                    fullWidth= {true}
                    defaultDate={this.props.meetDateInput}
                    onChange={(event, date) => {
                      meetDateInput = moment(date).format("MMM DD YYYY");
                      console.log(meetDateInput);
                    }}
                  />
                  <RaisedButton label="Save Edits" backgroundColor="#5D576B" labelColor="#F1F1EF" style={push}
                    onTouchTap={(event) => {
                        console.log(meetDateInput);
                        this.props.editContact(editUser, editId, firstInput, lastInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput);
                    }}
                  />
                </Paper>
                <Paper style={styleRight} zDepth={5} rounded={false} className="onePaper">
                  <p style={color}>Last Name:</p>
                  <TextField
                    name="lastNameInput"
                    fullWidth= {true}
                    defaultValue={this.props.last}
                    onChange={(event, newValue) => {
                    lastInput = newValue
                  }}/>
                  <p style={color}>Job Title:</p>
                  <TextField
                  name="jobTitleInput"
                  fullWidth= {true}
                  defaultValue={this.props.jobTitle} onChange={(event, newValue) => {
                  jobTitleInput = newValue
                  }}/>
                  <p style={color}>Phone:</p>
                  <TextField
                    name="phoneInput"
                    fullWidth= {true}
                    defaultValue={this.props.phone} onChange={(event, newValue) => {
                    phoneInput = newValue
                  }}/>
                  <p style={color}>Notes:</p>
                  <TextField
                    name="meetingNotes"
                    fullWidth= {true}
                    defaultValue={this.props.meetNotes}
                    multiLine={true}
                    onChange={(event, newValue) => {
                      notesInput = newValue
                    }}/>
                    <RaisedButton label="Delete Contact" backgroundColor="#5D576B" labelColor="#F1F1EF"
                      onTouchTap={(event) => {
                        const doubleCheck = confirm("Are you sure?");
                        if (doubleCheck == true) {
                          this.props.delete(editId, editUser);
                        }
                      }}
                    />
                </Paper>
              </div>
        </form>
      </MediaQuery>
      <MediaQuery query='(max-device-width: 999px)'>
      <form>
        <Paper style={styleBoth} zDepth={5} rounded={false} className="onePaper">
              <p>First Name:</p>
              <TextField
                name="firstNameInput"
                fullWidth= {true}
                onChange={(event, newValue) => {
                firstInput = newValue
              }}
                defaultValue={this.props.first}
              />
              <p>Last Name:</p>
              <TextField
                name="lastNameInput"
                fullWidth= {true}
                defaultValue={this.props.last}
                onChange={(event, newValue) => {
                lastInput = newValue
              }}/>
              <p>Company:</p>
              <TextField
              name="companyInput"
              fullWidth= {true}
              defaultValue={this.props.company} onChange={(event, newValue) => {
                companyInput = newValue
              }}/>

              <p>Job Title:</p>
              <TextField
              name="jobTitleInput"
              fullWidth= {true}
              defaultValue={this.props.jobTitle} onChange={(event, newValue) => {
              jobTitleInput = newValue
              }}/>
              <p>Email:</p>
              <TextField
                name="emailInput"
                fullWidth= {true}
                defaultValue={this.props.email} onChange={(event, newValue) => {
                emailInput = newValue
              }}/>
              <p>Phone:</p>
              <TextField
                name="phoneInput"
                fullWidth= {true}
                defaultValue={this.props.phone} onChange={(event, newValue) => {
                phoneInput = newValue
              }}/>
              <DatePicker
                floatingLabelText={"Date of meeting this contact " + meetDateInput}
                style={dateStyle}
                fullWidth= {true}
                defaultDate={this.props.meetDateInput}
                onChange={(event, date) => {
                  meetDateInput = moment(date).format("MMM DD YYYY");
                  console.log(meetDateInput);
                }}
              />
              <p>Notes:</p>
              <TextField
                name="meetingNotes"
                fullWidth= {true}
                defaultValue={this.props.meetNotes}
                multiLine={true}
                onChange={(event, newValue) => {
                  notesInput = newValue
                }}/>
              <RaisedButton label="Save Edits" backgroundColor="#5D576B" labelColor="#F1F1EF" style={pad}
                onTouchTap={(event) => {
                    console.log(meetDateInput);
                    this.props.editContact(editUser, editId, firstInput, lastInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput);
                }}
              />
                <RaisedButton label="Delete Contact" backgroundColor="#5D576B" labelColor="#F1F1EF" style={pad}
                  onTouchTap={(event) => {
                    const doubleCheck = confirm("Are you sure?");
                    if (doubleCheck == true) {
                      this.props.delete(editId, editUser);
                    }
                  }}
                />
          </Paper>
    </form>
  </MediaQuery>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  first: state.ContactState.firstName,
  last: state.ContactState.lastName,
  company: state.ContactState.company,
  jobTitle: state.ContactState.jobTitle,
  email: state.ContactState.email,
  phone: state.ContactState.phone,
  meetDate: state.ContactState.meetDate,
  meetNotes: state.ContactState.meetNotes
});

const mapDispatchToProps = (dispatch) => ({
  getOneContact: (linkId) => dispatch(actions.fetchWholeContact(linkId)),
  editContact: (editUser, editId, firstInput, lastInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput) => dispatch(actions.fetchUpdate(editUser, editId, firstInput, lastInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput)),
  delete: (editId, editUser) => dispatch(actions.fetchDeleteContact(editId, editUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
