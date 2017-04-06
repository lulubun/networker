import React from 'react';
import OneContact from './OneContact';

class Contacts extends React.Component {

  render() {
    return (
      <div>
        <div className="allContacts">
          <OneContact />
        </div>
      </div>
    );
  }
}

export default Contacts;
