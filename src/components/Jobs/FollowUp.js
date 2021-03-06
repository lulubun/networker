import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import '../../index.css';
const uuidv1 = require('uuid/v1');


class FollowUp extends React.Component {
  state = {
    date: moment(),
    type: '',
    notes: '',
    newDate: moment().add(1, 'week')
  }
  prettyDate = (date) => moment(date).format("MMM DD YYYY");

  render() {
    return (
      <div>
        <form>
        <DatePicker hintText="Date"
          value={this.state.date}
          onChange={(event, date) => {
          this.setState({date})
        }} />
        <RadioButtonGroup
          name="Job"
          valueSelected={this.state.type}
          onChange={(event, value) => {
            this.setState({type: value})
        }}
        value={this.state.type}>
        <RadioButton
          value="Interview"
          label="Interview"
        />
          <RadioButton
            value="Call"
            label="Call"
          />
          <RadioButton
            value="Email"
            label="Email"
          />
          <RadioButton
            value="Evaluation"
            label="Evaluation"
          />
          <RadioButton
            value="Other"
            label="Other"
          />
        </RadioButtonGroup>
        <TextField
          hintText="notes"
          floatingLabelText="Notes"
          ref={(node) => this.notesText = node}
          multiLine
          value={this.state.notes}
          onChange={(event, newValue) => {
            this.setState({notes: newValue})
          }}
        /><br />
        <RaisedButton label="Save Follow Up"
          backgroundColor="#5D576B" labelColor="#F1F1EF"
          onTouchTap={() => {
            const {jobId, user, addPast, close } = this.props;
            const pastId = uuidv1();
            if (this.state.type == '') {
              alert("Please include the type of contact made")
            } else {
              const prettyDate = moment(this.state.date).format("MMM DD YYYY");
              //user, jobId, pastId, dateOfContact, type, notes, newJobDate
              addPast(user, jobId, pastId, this.prettyDate(this.state.date), this.state.type, this.state.notes, this.prettyDate(this.state.newDate));
              close()
            }
          }} />
        </form>
      </div>
    )
  }
}

export default FollowUp;