import React from 'react';
import Divider from 'material-ui/Divider';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';


export function OnePastContact (props) {
  return (
    <div>
      <p>{this.props.oldDate}</p>
      <Divider />
      <p>{this.props.oldTypeCon}</p>
      <Divider />
      <p>{this.props.oldNote}</p>
      <RaisedButton label="Edit" />
    </div>
  );


}
