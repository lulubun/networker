import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


const Stages =  (props) => {
  const {val, fun} = props;
  console.log(val, fun)
  return (
  <RadioButtonGroup
    name="Stage"
    valueSelected={val}
    onChange={(e, v) => {
      console.log('e: ', e, v);
      fun(v)
    }}
    value={val || ''}
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
)};

export default Stages;