import React from 'react';
import moment from 'moment';
import {List, ListItem } from 'material-ui/List';
import {IconButton, Checkbox } from 'material-ui';
import Snooze from 'material-ui/svg-icons/av/snooze';
import {Link} from 'react-router';
import {Dialog, Subheader} from 'material-ui';
import '../index';
import FollowUp from './Jobs/FollowUp';


export class TodayList extends React.Component {
  state =  {
    newOpen: false,
    jobId: null,
    user: null,
  }

  toDo = (list, usr, fetchHeartDateUpdate) => list.map((l) => (<ListItem
      style={{
        padding: '0px 0px 0px 50px'
      }}
      key={l.company}
      leftCheckbox={
        <Checkbox onClick={() => this.setState({ jobId: l._id, newOpen: true })}/>
      }
    >
      <Link
        to={'/' + usr + '/one_Job/' + l._id }
        className="Link" key={l._id}
        style={{color: 'black', position: 'absolute', top: 16}}
      >
        {l.company} {l.nextDate}
      </Link>
      <IconButton tooltip="SVG Icon"
        style={{
          marginLeft: '160px'
        }}
        onClick={() => {
          const newDate = moment().add(1, 'day').format('MMM DD YYYY');
          fetchHeartDateUpdate(usr, l._id, l.important, newDate);
        }}
      >
        <Snooze />
      </IconButton>
    </ListItem>)
  );
  render() {
    const {todayList, user, fetchHeartDateUpdate, addPast, params } = this.props;
    const newList = todayList && todayList.reduce((acc, j) => {
      const today = moment();
      const newAcc = acc;
      if ((today >= moment(j.nextDate)) && j.stage !== 'Inactive') {
        newAcc.push(j)
      }
      return newAcc;
    }, []) || [];
    return (
      <div>
        <Subheader>Today's Followups</Subheader>
        <List>
          {this.toDo(newList, user, fetchHeartDateUpdate)}
        </List>
        <Dialog
          title="Record of Follow Up"
          modal={false}
          open={this.state.newOpen}
          onRequestClose={this.handleClose}
        >
          <FollowUp
            close={() => this.setState({ newOpen: false })}
            jobId={this.state.jobId}
            user={params.user}
            addPast={addPast}
          />
        </Dialog>
      </div>
    )
  }
}

export default TodayList;
