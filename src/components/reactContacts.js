import React from 'react';
import ContactLink from './reactContactLink';
import {connect} from 'react-redux';

export default function Contacts(props) {
  const linkList = Object.keys(props.list).map((contactID, index) => {
    const link = props.list[contactID];
    return (
      <li key={index}>
        <ContactLink
          id={link.id}
          nextContact={link.dateNext} important={link.important}
          firstName={link.firstName} lastName={link.lastName}
          company={link.company}
        />
      </li>
    );
  });

  return (
    <ul>
      {linkList}
    </ul>
  );
};
