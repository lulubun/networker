import React from 'react';
import {connect} from 'react-redux';

class Past extends React.Component {

  render() {
    return (
      <div>
        <div className="allPast">
          {this.props.allPastList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allPastList: state.AllPastState.allPast
});

export default connect(mapStateToProps)(Past);
