import React from 'react';
import PropTypes from 'prop-types';


class Control extends React.Component {

  render() {
    return (
      <div>
        <div className="routerView">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Control;
