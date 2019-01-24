import React from 'react';
import moment from 'moment';
import {List, ListItem } from 'material-ui/List';
import {IconButton, Checkbox } from 'material-ui';
import Snooze from 'material-ui/svg-icons/av/snooze';
import {Link} from 'react-router';
import {Dialog, Subheader} from 'material-ui';
import '../index';
import FollowUp from './Jobs/FollowUp';

const toDo = (list, usr, fetchHeartDateUpdate) => list.map((l) => (<ListItem
    style={{
      padding: '0px 0px 0px 50px'
    }}
    key={l.serCompany}
    leftCheckbox={
      <Checkbox onClick={() => console.log(l)}/>
    }
  >
    <Link to={'/' + usr + '/one_Job/' + l._id } className="Link" key={l.id} style={{color: 'black', position: 'absolute', top: 16}}>
      {l.serCompany} {l.serNextDate}
    </Link>
    <IconButton tooltip="SVG Icon"
      style={{
        marginLeft: '160px'
      }}
      onClick={() => {
        const newDate = moment().add(1, 'day').format('MMM DD YYYY');
        fetchHeartDateUpdate(usr, l._id, l.serImportant, newDate);
      }}
    >
      <Snooze />
    </IconButton>
  </ListItem>)
);


const TodayList = (props) => {
  state =  {
    newOpen: false,
  }
  const newList = props.todayList && props.todayList.reduce((acc, j) => {
    const today = moment();
    const newAcc = acc;
    if ((today >= moment(j.serNextDate)) && j.serStage !== 'Inactive') {
      newAcc.push(j)
    }
    return newAcc;
  }, []) || [];
  console.log('newList: ', newList);

  return (
  <div>
    <Subheader>Today's Followups</Subheader>
    <List>
      {toDo(newList, props.user, props.fetchHeartDateUpdate)}
    </List>
    <Dialog
      title="Record of Follow Up"
      modal={false}
      open={this.state.newOpen}
      onRequestClose={this.handleClose}
    >
      <FollowUp {...this.props} close={() => this.setState({ newOpen: false })}/>
    </Dialog>
  </div>
)};

export default TodayList;