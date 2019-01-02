import React from 'react';
import {connect} from 'react-redux';
import ActionFavorite from 'material-ui/svg-icons/alert/error';
import ActionFavoriteBorder from 'material-ui/svg-icons/alert/error-outline';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../actions/jobActions';
import moment from 'moment';
import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadioGroup, FormsyText } from 'formsy-material-ui/lib';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


let startId = 0;
let companyInput = '';
let jobTitleInput = '';
let startDate = moment().add(14, 'days').calendar();
let dateNextInput = moment(startDate).format("MMM DD YYYY");
let importantInput = '';
let contactNameInput = '';
let researchInput = '';
let jobNotesInput = '';
let websiteInput = '';
let postInput = '';
let stageInput = '';


export class NewJob extends React.Component {

  state = {
    stage: ''
  }
  componentDidMount() {
    this.props.clear(startId, companyInput, jobTitleInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput);
  };

  render() {
    const {
      params,
    } = this.props;
    const user = params.user;

    let startDate = moment().add(14, 'days').calendar();
    let dateNextInput = moment(startDate).format("MMM DD YYYY");
    let foundJobInput = moment().format("MMM DD YYYY");

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
            name="companyInput"
            hintText="Company"
            onChange={(event, newValue) => {
            companyInput = newValue
          }}/><br />
          <FormsyText
            name="jobTitleInput"
            hintText="Job Applied For"
            onChange={(event, newValue) => {
            jobTitleInput = newValue
          }}/><br />
          <FormsyText
            name="websiteInput"
            hintText="Company Website"
            onChange={(event, newValue) => {
            websiteInput = newValue
          }}/><br />
          <FormsyText
            name="postInput"
            hintText="Job Posting"
            onChange={(event, newValue) => {
            postInput = newValue
          }}/><br />
          <FormsyDate
            name="foundJobInput"
            floatingLabelText="Date discovered"
            onChange={(event, date) => {foundJobInput = moment(date).format("MMM DD YYYY")}}
          />
          <br />
          <FormsyDate
            name="dateNextInput"
            floatingLabelText="Date to follow up"
            onChange={(event, date) => {dateNextInput = moment(date).format("MMM DD YYYY")}}
          />
          <br />
          <RadioButtonGroup
            name="Stage"
            valueSelected={this.state.stage}
            onChange={(event, value) => {
              this.setState({stage: value})
            }}
            value={stageInput}
          >
            <RadioButton
              value="Discovered"
              label="Discovered"
            />
            <RadioButton
              value="Applied"
              label="Applied"
            />
            <RadioButton
              value="Phone Screen"
              label="Phone Screen"
            />
            <RadioButton
              value="Homework"
              label="Homework"
            />
            <RadioButton
              value="Interview"
              label="Interview"
            />
            <RadioButton
              value="Offer"
              label="Offer"
            />
            <RadioButton
              value="Inactive"
              label="Inactive"
            />
          </RadioButtonGroup>
          <FormsyText
            name="contactNameInput"
            hintText="Contact at this Company"
            onChange={(event, newValue) => {
            contactNameInput = newValue
          }}/><br />
          <FormsyText
            name="researchInput"
            hintText="Research about this company"
            multiLine
            fullWidth
            onChange={(event, newValue) => {
              researchInput = newValue
            }}/>
          <br />
          <FormsyText
            name="jobNotesInput"
            hintText="Other notes about this job opportunity"
            multiLine
            fullWidth
            onChange={(event, newValue) => {
              jobNotesInput = newValue
            }}/>
          <br />
          <FormsyCheckbox
          name="importantInput"
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Select if this is an important Job Opportunity"
          onChange={(event, isInputChecked) => {
            importantInput = isInputChecked
          }}
          />
          <br />
          <RaisedButton label="Save Job" backgroundColor="#5D576B" labelColor="#F1F1EF"
            type="submit"
            onTouchTap={(event) => {
              this.props.saveJob(user, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput)
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

// const mapStateToProps = (state) => ({
//   // id: state.jobState.id,
//   // companyInput: state.jobState.companyState,
//   // jobTitleInput: state.jobState.jobTitleState,
//   // foundJobInput: state.jobState.foundJobState,
//   // dateNextInput: state.jobState.dateNextState,
//   // stageInput: state.jobState.stageState,
//   // contactNameInput: state.jobState.contactState,
//   // researchInput: state.jobState.researchState,
//   // jobNotesInput: state.jobState.jobNotesState,
//   // websiteInput: state.jobState.websiteState,
//   // postInput: state.jobState.postState,
// });

const mapDispatchToProps = (dispatch) => ({
  saveJob: (user, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput) => dispatch(actions.sendNewJob(user, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput)),
  clear: (startId, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput) => dispatch(actions.setOneJob(startId, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput))
})

export default connect(null, mapDispatchToProps)(NewJob);
