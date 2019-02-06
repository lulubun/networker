import React from 'react';
import {connect} from 'react-redux';
import ActionFavorite from 'material-ui/svg-icons/alert/error';
import ActionFavoriteBorder from 'material-ui/svg-icons/alert/error-outline';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../actions/jobActions';
import moment from 'moment';
import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyText } from 'formsy-material-ui/lib';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Select from 'react-select';

const startDate = moment().add(14, 'days').calendar();
export class NewJob extends React.Component {
  state = {
    stage: '',
    companyInput: null,
    jobTitleInput: null,
    dateNextInput: moment(startDate).format("MMM DD YYYY"),
    importantInput: null,
    contactNameInput: [],
    researchInput: null,
    jobNotesInput: null,
    websiteInput: null,
    postInput: null,
    stageInput: null,
    foundJobInput: moment().format("MMM DD YYYY"),
  }
  // componentDidMount() {
  //   const { clear } = this.props;
  //   const { companyInput, jobTitleInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput } = this.state;
  //   // clear(null, companyInput, jobTitleInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput);
  // };

  render() {
    const {
      params,
      contacts,
      saveJob,
    } = this.props;
    const contactValues = contacts.reduce((acc, c) => {
      const newAcc = acc;
      newAcc.push({
        value: c._id,
        label: c.serFirst + c.serLast,
      })
      return newAcc;
    }, []).concat([{value: 'new', label: 'Add New Contact'}])
    const user = params.user;
    const { stage, companyInput, jobTitleInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput, foundJobInput } = this.state;

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
            onChange={(event, newValue) => this.setState({companyInput: newValue})}
          /><br />
          <FormsyText
            name="jobTitleInput"
            hintText="Job Applied For"
            onChange={(event, newValue) => this.setState({jobTitleInput: newValue})}
          /><br />
          <FormsyText
            name="websiteInput"
            hintText="Company Website"
            onChange={(event, newValue) => this.setState({websiteInput: newValue})}
          /><br />
          <FormsyText
            name="postInput"
            hintText="Job Posting"
            onChange={(event, newValue) => this.setState({postInput: newValue})}
          /><br />
          <FormsyDate
            name="foundJobInput"
            floatingLabelText="Date discovered"
            onChange={(e, date) => this.setState({ foundJobInput: moment(date).format("MMM DD YYYY")})}
          />
          <br />
          <FormsyDate
            name="dateNextInput"
            floatingLabelText="Date to follow up"
            onChange={(e, date) => this.setState({ dateNextInput: moment(date).format("MMM DD YYYY")})}
          />
          <br />
          <RadioButtonGroup
            name="Stage"
            valueSelected={stage}
            onChange={(event, value) => {
              this.setState({stage: value})
            }}
            value={stageInput || ''}
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
          <Select
            style={{ zIndex: 1000, margin: '3vh 0 0 0' }}
            value={contactNameInput}
            placeholder="Contacts at this Company"
            isMulti
            onChange={(e) => {
              if (e.find((v) => v.value === 'new')) {
                console.log('redirect!!!')
              } else {
                this.setState({ contactNameInput: e})
              }
            }}
            options={contactValues}
          />
          <br />
          <FormsyText
            name="researchInput"
            hintText="Research about this company"
            multiLine
            fullWidth
            onChange={(event, newValue) => this.setState({researchInput: newValue})}
          />
          <br />
          <FormsyText
            name="jobNotesInput"
            hintText="Other notes about this job opportunity"
            multiLine
            fullWidth
            onChange={(event, newValue) => this.setState({jobNotesInput: newValue})}
          />
          <br />
          <FormsyCheckbox
            name="importantInput"
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Select if this is an important Job Opportunity"
            onChange={(e, ck) => this.setState({importantInput: ck})}
          />
          <br />
          <RaisedButton label="Save Job" backgroundColor="#5D576B" labelColor="#F1F1EF"
            type="submit"
            onTouchTap={(event) => {
              saveJob(user, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput)
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

const mapStateToProps = (state) => ({
  contacts: state.AllState.allContacts,
});

const mapDispatchToProps = (dispatch) => ({
  saveJob: (user, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput) => dispatch(actions.sendNewJob(user, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput)),
  clear: (startId, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput) => {
    console.log(startId, companyInput)
    return dispatch(actions.setOneJob(startId, companyInput, jobTitleInput, foundJobInput, dateNextInput, importantInput, stageInput, contactNameInput, researchInput, jobNotesInput, websiteInput, postInput))},
})

export default connect(mapStateToProps, mapDispatchToProps)(NewJob);
