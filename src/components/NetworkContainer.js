import React from 'react';
import Contacts from './Contacts';
import Jobs from './Jobs';

class NetworkContainer extends React.Component {

  render() {
    const style = {
      width: '100%',
      paddingTop: '-10px',
      boxSizing: 'borderBox'
    }
    return (
      <div>
        <div className="networkContainer" style={style}>
          <Contacts />
          <Jobs />
        </div>
      </div>
    );
  }
}

export default NetworkContainer;
