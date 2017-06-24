import React from 'react';
import {connect} from 'react-redux';
import ActionFavorite from 'material-ui/svg-icons/toggle/star';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/star-border';
import RaisedButton from 'material-ui/RaisedButton';
// import * as actions from '../actions/JobActions';
import moment from 'moment';
import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadioGroup, FormsyText } from 'formsy-material-ui/lib';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';

let startId = 0;
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


export class NewJob extends React.Component {
  componentDidMount() {
    this.props.clear(startId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput);
  };

  render() {
    const user = this.props.params.user;

    const style = {
      padding: 20,
      margin: 20,

    };

    return(
      <div className="new_Job">
        <Paper style={style} zDepth={5} rounded={false} className="onePaper">

        <Formsy.Form>
          <h2>New Job</h2>
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
            hintText="Email (ex john@gmail.com)"
            validations="isEmail"
            validationError="please enter a valid email address"
            onChange={(event, newValue) => {
            emailInput = newValue
          }}/><br />
          <FormsyText
            name="phoneInput"
            hintText="Phone Number (ex 5555555555)"
            validations="isNumeric"
            validationError="please enter a valid phone number"
            onChange={(event, newValue) => {
            phoneInput = newValue
          }}/><br />
          <FormsyDate
            name="meetDateInput"
            floatingLabelText="Date of meeting this Job"
            onChange={(event, date) => {meetDateInput = moment(date).format("MMM DD YYYY")}}
          />
          <br />
          <FormsyText
            name="notesInput"
            hintText="Notes about this Job"
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
          <FormsyCheckbox
          name="importantInput"
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Select if this is an important Job"
          onChange={(event, isInputChecked) => {
            console.log(isInputChecked);
            importantInput = isInputChecked
          }}
          />
          <br />
          <RaisedButton label="Save Job" backgroundColor="#5D576B" labelColor="#F1F1EF"
            type="submit"
            onTouchTap={(event) => {
              if (firstInput == '' && lastInput == '') {
                alert("You must include a Job name")
              } else if (emailInput == '' && phoneInput == '') {
                alert("You must include one form of Job")
              } else {
                console.log(user);
                this.props.saveJob(user, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput);
              }
            }}
          />
          <Link to={'/' + user + '/Jobs'} className="Link"><RaisedButton label="Cancel" backgroundColor="#5D576B" labelColor="#F1F1EF" style={{marginLeft: 10}}
          /></Link>
        </Formsy.Form>
      </Paper>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  // saveJob: (user, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput) => dispatch(actions.sendNewJob(user, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput)),
  // clear: (startId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput) => dispatch(actions.setOneJob(startId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput))
})

export default connect(null, mapDispatchToProps)(NewJob);
