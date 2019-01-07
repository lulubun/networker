import React from 'react';
import moment from 'moment';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router';
import Subheader from 'material-ui/Subheader';

const toDo = (list, usr) => list.map((l) => (<Link to={'/' + usr + '/one_Job/' + l._id } className="Link" key={l.id}><ListItem
primaryText={l.serCompany}
secondaryText={l.serNextDate}
key={l.serCompany}
/></Link>));


const TodayList = (props) => {
  const newList = props.todayList && props.todayList.reduce((acc, j) => {
    const today = moment();
    const newAcc = acc;
    if (today > moment(j.serNextDate)) {
      newAcc.push(j)
    }
    return newAcc;
  }, []) || [];
  return (
  <div>
    <Subheader>Today's Followups</Subheader>
    <List>
      {toDo(newList, props.user)}
    </List>
  </div>
)};

export default TodayList;