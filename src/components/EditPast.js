import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/pastActions';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import '../index.css';

export class EditPast extends React.Component {
  render() {
    return (
      <Paper style={style} zDepth={1}>
      <form>
        <p>Edit Follow Up from {this.props.day}</p>
        <RadioButtonGroup name="contactType"
          onChange={(event, value) => {
          typeInput = value;
        }}>
          <RadioButton
            value="call"
            label="Call"
          />
          <RadioButton
            value="email"
            label="Email"
          />
          <RadioButton
            value="meeting"
            label="Meeting"
          />
          <RadioButton
            value="other"
            label="Other"
          />
        </RadioButtonGroup>
        <TextField
          hintText={this.props.notation}
          floatingLabelText="notes"
          ref={(node) => this.notesText = node}
          multiLine={true}
          onChange={(event, newValue) => {
            contactNotesInput = newValue;
          }}
        /><br />
        <RaisedButton label="Save Changes"
          backgroundColor="#5D576B" labelColor="#F1F1EF"
          onTouchTap={(event) => {
            if (typeInput == '') {
              alert("Please include the type of contact made")
            } else {
              console.log(contactId, user, pastId);
              this.props.addPast(user, contactId, pastId, dateInput, typeInput, contactNotesInput);
            //  this.notesText.setState({ value: "" })
            }
          }} />
      </form>
      </Paper>
    )
  }
}
