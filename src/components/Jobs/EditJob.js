import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../actions/jobActions';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { FormsyCheckbox, FormsyDate, FormsyRadioGroup, FormsyText } from 'formsy-material-ui/lib';
import ActionFavorite from 'material-ui/svg-icons/alert/error';
import ActionFavoriteBorder from 'material-ui/svg-icons/alert/error-outline';
import Checkbox from 'material-ui/Checkbox';
import Stages from './Stages';

export class EditJob extends React.Component {
  componentDidMount() {
    this.props.getOneJob(this.props.params.id);
  }

  state = {
    stage: this.props.stage
  }

  render() {
    let editUser = this.props.params.user;
    let editId = this.props.params.id;
    let editCo = this.props.co;
    let editTitle = this.props.title;
    let editFound = this.props.found;
    let editFollowUp = this.props.followUp;
    let editStage = this.state.stage;
    let editContact = this.props.contact;
    let editResearch = this.props.research;
    let editNotes = this.props.notes;
    let editWeb = this.props.web;
    let editPost = this.props.posting;

    const dateStyle = {
      width: '100%',
    };

    const styleLeft = {
      width: '90%',
      padding: 20,
      margin: 'auto',
      minHeight: 500
    };

    const styleBoth = {
      padding: 20,
      margin: 20
    }

    const titleStyle = {
      marginLeft: 80,
      color: "#5D576B"

    }

    const pad = {
      marginLeft: 10,
      marginRight: 10,
    }

    const push = {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10
    }

    const color = {
      color: '#9892a6'
    }

    return(
      <div className="edit_job">
          <h3 style={titleStyle}>Edit Job</h3>
          <MediaQuery query='(min-device-width: 1000px)'>
          <form>
            <div className="papers">
            <Paper style={styleLeft} zDepth={1} rounded={false} className="onePaper">
                  <p style={color}>Company:</p>
                  <TextField
                    name="editCo"
                    fullWidth
                    onChange={(event, newValue) => {
                    editCo=newValue
                  }}
                    defaultValue={this.props.co}
                  />
                  <p style={color}>Job Title:</p>
                  <TextField
                    name="editTitle"
                    fullWidth
                    defaultValue={this.props.title}
                    onChange={(event, newValue) => {
                    editTitle=newValue
                  }}/>
                  <p style={color}>Date Job Discovered:</p>
                  <DatePicker
                    floatingLabelText={editFound}
                    style={dateStyle}
                    fullWidth
                    // defaultDate={this.props.found}
                    onChange={(event, date) => {
                      editFound=moment(date).format("MMM DD YYYY");
                    }}
                  />
                  <Stages val={this.state.stage} fun={(v) => this.setState({stage: v})} />
                  {/* <RadioButtonGroup
                    name="Stage"
                    valueSelected={this.state.stage}
                    onChange={(event, value) => {
                      this.setState({stage: value})
                      console.log(this.state.stage);
                    }}
                    value={editStage}
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
                      value="Homework"
                      label="Homework"
                    />
                    <RadioButton
                      value="Phone Screen"
                      label="Phone Screen"
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
                  </RadioButtonGroup> */}
                  <p style={color}>Contact at Company:</p>
                  <TextField
                  name="editContact"
                  fullWidth
                  defaultValue={this.props.contact} onChange={(event, newValue) => {
                  editContact=newValue
                  }}/>
                  <p style={color}>Research:</p>
                  <TextField
                    name="editResearch"
                    fullWidth
                    defaultValue={this.props.research} onChange={(event, newValue) => {
                    editResearch=newValue
                  }}/>
                  <p style={color}>Notes:</p>
                  <TextField
                    name="editNotes"
                    fullWidth
                    defaultValue={this.props.notes} onChange={(event, newValue) => {
                    editNotes=newValue
                  }}/>
                  <p style={color}>Website:</p>
                  <TextField
                    name="editWeb"
                    fullWidth
                    defaultValue={this.props.web}
                    multiLine
                    onChange={(event, newValue) => {
                      editWeb=newValue
                    }}/>
                    <p style={color}>Job Posting:</p>
                    <TextField
                      name="editPost"
                      fullWidth
                      defaultValue={this.props.posting}
                      multiLine
                      onChange={(event, newValue) => {
                        editPost=newValue
                      }}/>
                  <RaisedButton label="Save Edits" backgroundColor="#5D576B" labelColor="#F1F1EF" style={push}
                    onTouchTap={(event) => {
                      console.log(editStage);
                        this.props.editJob(editUser, editId, editCo, editTitle, editFound, editFollowUp, editStage, editContact, editResearch, editNotes, editWeb, editPost);
                    }}
                  />
                  <RaisedButton label="Delete Job" backgroundColor="#5D576B" labelColor="#F1F1EF"
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
          <div className="papers">
          <Paper style={styleLeft} zDepth={1} rounded={false} className="onePaper">
                <p style={color}>Company:</p>
                <TextField
                  name="editCo"
                  fullWidth
                  onChange={(event, newValue) => {
                  editCo=newValue
                }}
                  defaultValue={this.props.co}
                />
                <p style={color}>Job Title:</p>
                <TextField
                  name="editTitle"
                  fullWidth
                  defaultValue={this.props.title}
                  onChange={(event, newValue) => {
                  editTitle=newValue
                }}/>
                <p style={color}>Date Job Discovered:</p>
                <DatePicker
                  floatingLabelText={editFound}
                  style={dateStyle}
                  fullWidth
                  // defaultDate={this.props.found}
                  onChange={(event, date) => {
                    editFound=moment(date).format("MMM DD YYYY");
                  }}
                />
                <RadioButtonGroup
                  name="Stage"
                  valueSelected={this.state.stage}
                  onChange={(event, value) => {
                    this.setState({stage: value})
                  }}
                  value={editStage}
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
                <p style={color}>Contact at Company:</p>
                <TextField
                name="editContact"
                fullWidth
                defaultValue={this.props.contact} onChange={(event, newValue) => {
                editContact=newValue
                }}/>
                <p style={color}>Research:</p>
                <TextField
                  name="editResearch"
                  fullWidth
                  defaultValue={this.props.research} onChange={(event, newValue) => {
                  editResearch=newValue
                }}/>
                <p style={color}>Notes:</p>
                <TextField
                  name="editNotes"
                  fullWidth
                  defaultValue={this.props.notes} onChange={(event, newValue) => {
                  editNotes=newValue
                }}/>
                <p style={color}>Website:</p>
                <TextField
                  name="editWeb"
                  fullWidth
                  defaultValue={this.props.web}
                  multiLine
                  onChange={(event, newValue) => {
                    editWeb=newValue
                  }}/>
                  <p style={color}>Job Posting:</p>
                  <TextField
                    name="editPost"
                    fullWidth
                    defaultValue={this.props.posting}
                    multiLine
                    onChange={(event, newValue) => {
                      editPost=newValue
                    }}/>
                    {/* <Checkbox
                    name="editImportant"
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    label="Select if this is an important Job Opportunity"
                    onChange={(event, isInputChecked) => {
                      editImportant = isInputChecked
                    }}
                    /> */}
                <RaisedButton label="Save Edits" backgroundColor="#5D576B" labelColor="#F1F1EF" style={push}
                  onTouchTap={(event) => {
                      console.log(editStage);
                      this.props.editJob(editUser, editId, editCo, editTitle, editFound, editFollowUp, editStage, editContact, editResearch, editNotes, editWeb, editPost);
                  }}
                />
                <RaisedButton label="Delete Job" backgroundColor="#5D576B" labelColor="#F1F1EF" style={push}
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
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  co: state.JobState.companyState,
  title: state.JobState.jobTitleState,
  found: state.JobState.foundJobState,
  followUp: state.JobState.dateNextState,
  stage: state.JobState.stageState,
  contact: state.JobState.contactState,
  research: state.JobState.researchState,
  notes: state.JobState.researchState,
  web: state.JobState.websiteState,
  posting: state.JobState.postState
});

const mapDispatchToProps = (dispatch) => ({
 getOneJob: (linkId) => dispatch(actions.fetchWholeJob(linkId)),
 editJob: (editUser, editId, editCo, editTitle, editFound, editFollowUp, editStage, editContact, editResearch, editNotes, editWeb, editPost) => dispatch(actions.fetchUpdate(editUser, editId, editCo, editTitle, editFound, editFollowUp, editStage, editContact, editResearch, editNotes, editWeb, editPost)),
 delete: (editId, editUser) => dispatch(actions.fetchDeleteJob(editId, editUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditJob);
