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
import Stages from './Stages';
import Select from 'react-select';


const dateStyle = {
  width: '100%',
};

const styleLeft = {
  width: '90%',
  padding: 20,
  margin: 'auto',
  minHeight: 500
};

const titleStyle = {
  marginLeft: 80,
  color: "#5D576B"

}

const push = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 10
}

const color = {
  color: '#9892a6'
}

export class EditJob extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props);
    this.state = {};
  }
  componentWillMount() {
    // this.props.getOneJob(this.props.params._id);
    const { allJobs, params } = this.props
    const  _id = params._id;
    console.log('this.props.params._id: ', this.props.params._id, this.props.allJobs);
    const currentJob = allJobs.filter((j) => j._id === _id)[0]
    console.log('currentJob: ', currentJob);
    this.setState(currentJob)
  }

  render() {
    const {contacts, params} = this.props;
    const {user, _id} = params;

    const {
      company,
      jobTitle,
      foundDate,
      nextDate,
      important,
      stage,
      contact,
      research,
      notes,
      website,
      post,
      pastJobs,
    } = this.state;

    const contactValues = contacts.reduce((acc, c) => {
      const newAcc = acc;
      newAcc.push({
        value: c._id,
        label: c.serFirst + c.serLast,
      })
      return newAcc;
    }, []).concat([{value: 'new', label: 'Add New Contact'}])

    console.log('company: ', company);


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
                      this.setState({company: newValue})
                  }}
                    defaultValue={company}
                  />
                  <p style={color}>Job Title:</p>
                  <TextField
                    name="editTitle"
                    fullWidth
                    defaultValue={jobTitle}
                    onChange={(event, newValue) => {
                      this.setState({jobTitle: newValue})
                    }}/>
                  <p style={color}>Date Job Discovered:</p>
                  <DatePicker
                    floatingLabelText={foundDate}
                    style={dateStyle}
                    fullWidth
                    // defaultDate={}
                    onChange={(event, date) => {
                      this.setState({foundDate: date})
                    }}
                  />
                  <Stages val={stage} fun={(v) => this.setState({stage: v})} />     
                  <p style={color}>Contact at Company:</p>
                  <Select
                    style={{ zIndex: 1000, margin: '3vh 0 0 0' }}
                    value={contact}
                    placeholder="Contacts at this Company"
                    isMulti
                    onChange={(e) => {
                      if (e.find((v) => v.value === 'new')) {
                        console.log('redirect!!!')
                      } else {
                        this.setState({ contact: e})
                      }
                    }}
                    options={contactValues}
                  />
                  <p style={color}>Research:</p>
                  <TextField
                    name="editResearch"
                    fullWidth
                    defaultValue={research}
                    onChange={(event, newValue) => {
                      this.setState({research: newValue})
                    }}/>
                  <p style={color}>Notes:</p>
                  <TextField
                    name="editNotes"
                    fullWidth
                    defaultValue={notes}
                    onChange={(event, newValue) => {
                      this.setState({notes: newValue})
                    }}/>
                  <p style={color}>Website:</p>
                  <TextField
                    name="editWeb"
                    fullWidth
                    defaultValue={website}
                    multiLine
                    onChange={(event, newValue) => {
                      this.setState({website: newValue})
                    }}/>
                    <p style={color}>Job Posting:</p>
                    <TextField
                      name="editPost"
                      fullWidth
                      defaultValue={post}
                      multiLine
                      onChange={(event, newValue) => {
                        this.setState({post: newValue})
                      }}/>
                  <RaisedButton label="Save Edits" backgroundColor="#5D576B" labelColor="#F1F1EF" style={push}
                    onTouchTap={() => {
                      this.props.editJob(
                        user,
                        _id,
                        company,
                        jobTitle,
                        foundDate,
                        nextDate,
                        important,
                        stage,
                        contact,
                        research,
                        notes,
                        website,
                        post,
                        pastJobs
                      )
                      }}
                  />
                  <RaisedButton label="Delete Job" backgroundColor="#5D576B" labelColor="#F1F1EF"
                    onTouchTap={(event) => {
                      const doubleCheck = confirm("Are you sure?");
                      if (doubleCheck == true) {
                        this.props.delete(_id, user);
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
                    this.setState({company: newValue})
                  }}
                  defaultValue={company}
                />
                <p style={color}>Job Title:</p>
                <TextField
                  name="editTitle"
                  fullWidth
                  defaultValue={jobTitle}
                  onChange={(event, newValue) => {
                    this.setState({jobTitle: newValue})
                  }}/>
                <p style={color}>Date Job Discovered:</p>
                <DatePicker
                  floatingLabelText={foundDate}
                  style={dateStyle}
                  fullWidth
                  // defaultDate={this.props.found}
                  onChange={(event, date) => {
                    this.setState({foundDate: moment(date).format("MMM DD YYYY")})
                  }}
                />
                <RadioButtonGroup
                  name="Stage"
                  valueSelected={stage}
                  onChange={(event, value) => {
                    this.setState({stage: value})
                  }}
                  // value={stage}
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
                defaultValue={contact}
                onChange={(event, value) => {
                  this.setState({contact: value})
                }}/>
                <p style={color}>Research:</p>
                <TextField
                  name="editResearch"
                  fullWidth
                  defaultValue={research}
                  onChange={(event, value) => {
                    this.setState({research: value})
                }}/>
                <p style={color}>Notes:</p>
                <TextField
                  name="editNotes"
                  fullWidth
                  defaultValue={notes}
                  onChange={(event, value) => {
                    this.setState({notes: value})
                }}/>
                <p style={color}>Website:</p>
                <TextField
                  name="editWeb"
                  fullWidth
                  defaultValue={website}
                  multiLine
                  onChange={(event, value) => {
                    this.setState({website: value})
                  }}
                />
                <p style={color}>Job Posting:</p>
                <TextField
                  name="editPost"
                  fullWidth
                  defaultValue={post}
                  multiLine
                  onChange={(event, value) => {
                    this.setState({post: value})
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
                  onTouchTap={() => {
                      this.props.editJob(
                        user,
                        _id,
                        company,
                        jobTitle,
                        foundDate,
                        nextDate,
                        important,
                        stage,
                        contact,
                        research,
                        notes,
                        website,
                        post,
                        pastJobs
                      )
                    }}
                />
                <RaisedButton label="Delete Job" backgroundColor="#5D576B" labelColor="#F1F1EF" style={push}
                  onTouchTap={() => {
                    const doubleCheck = confirm("Are you sure?");
                    if (doubleCheck == true) {
                      this.props.delete(_id, user);
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
  allJobs: state.AllState.allJobs,
  contacts: state.AllState.allContacts,
});

const mapDispatchToProps = (dispatch) => ({
 getOneJob: (linkId) => dispatch(actions.fetchWholeJob(linkId)),
 editJob: (user, job) => dispatch(actions.fetchUpdate(user, job)),
 delete: (editId, editUser) => dispatch(actions.fetchDeleteJob(editId, editUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditJob);
