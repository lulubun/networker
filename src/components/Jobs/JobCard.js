import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import Alarm from 'material-ui/svg-icons/action/alarm';
import AddToCalendar from 'react-add-to-calendar';
import Checkbox from 'material-ui/Checkbox';
import Edit from 'material-ui/svg-icons/image/edit';
import ActionFavorite from 'material-ui/svg-icons/alert/error';
import ActionFavoriteBorder from 'material-ui/svg-icons/alert/error-outline';
import { RaisedButton } from 'material-ui';

const style = {
  padding: 20,
  margin: 20,
};

const nameStyle = {
  display: 'inline',
  position: 'relative'
}

const JobCard = (props) => {
  let dayNext = moment(props.dateNext).format("YYYY-MM-DD");
  let overdue = "";
  if (dayNext < moment().format("YYYY-MM-DD")) {
    overdue = 'Overdue:'
  }

  let pushEvent = {
    title: 'Follw up with ' + props.co,
    startTime: dayNext,
    endTime: dayNext
  }

  let overdueStyle = {
    fontWeight: 'bold',
  }

  if (dayNext < moment().format("YYYY-MM-DD")) {
    overdueStyle = {
      color: 'red',
      fontWeight: 'bold'
    }
  }

  return (
  <Paper style={style} zDepth={1}>
    <div className="JobName" style={nameStyle}>
      <Checkbox
      label={props.co}
      labelPosition='left'
      checked={props.important}
      iconStyle={{width: '3em', height: '3em'}}
      checkedIcon={<ActionFavorite />}
      uncheckedIcon={<ActionFavoriteBorder />}
      labelStyle={{float: 'right', paddingBottom: 10, fontSize: '3em', lineHeight: '100%'}}
      onCheck={(event, isInputChecked) => {
        const dateSend = props.dateNext;
        props.changeHeartDate(props.user, props.jobId, isInputChecked, dateSend)
      }} />
    </div>
    <p>Job Title:   {props.job}</p>
    {/* <Link to={'/' + props.user + '/one_contact/' + contact._id}}> */}
      <p>Contact:   {props.contactName}</p>
    {/* </Link> */}
    <p>Company website: {props.web}</p>
    <p>Job posting: {props.listing}</p>
    <p>Stage: {props.progress}</p>
    <p>Found out about this job on:  {props.foundDate}</p>
    <p>Research on company: {props.research}</p>
    <p>Notes:   {props.info}</p>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
        }}
      >
        <p style={overdueStyle}>
          <Alarm className="conIcon" style={overdueStyle}/>{overdue} Follow up on 
          <RaisedButton style={{ width: '40px'}}>
            <DatePicker
              hintText={props.dateNext}
              hintStyle={{color: 'red'}}
              underlineStyle={{display: 'none'}}
              autoOk    
              onChange={(e, date) => {
                let sendDate = moment(date).format("MMM DD YYYY");
                let heart = props.important;
                props.changeHeartDate(props.user, props.jobId, heart, sendDate)
              }}
            />
        </RaisedButton>
        </p>
      </div>
      <div
        style={{
          margin: '0 0 1vh 0',
          // border: '1px solid black'
        }}
      >
        {/* <DatePicker
          hintText="Edit Date"
          hintStyle={{color: 'black'}}
          underlineStyle={{display: 'none'}}
          autoOk    
          onChange={(event, date) => {
            let sendDate = moment(date).format("MMM DD YYYY");
            let heart = props.important;
            props.changeHeartDate(props.user, props.jobId, heart, sendDate)
          }}
        /> */}
      </div>
      <div
        style={{
          margin: '1vh 0 0 0',
          // border: '1px solid black'
        }}
      >
        <AddToCalendar
          event={pushEvent}
          buttonLabel="Add to Calendar"
          buttonTemplate={{ textOnly: 'none' }}
          displayItemIcons={false}
        />
      </div>
    </div>
    <div
      style={{
        position: 'relative', margin: '1vh 1vw 1vh 1vw', width: '100%'
      }}
    >
      <Link to={'/' + props.user + '/edit_job/' + props.params.id} className="Link" style={{ position: 'absolute', right: 0, bottom: 0 }}>
        <Edit />
      </Link>
    </div>
  </Paper>
)};

export default JobCard
