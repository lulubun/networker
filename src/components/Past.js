import React from 'react';
import OnePastContact from './OnePastContact';
import ContactLink from './ContactLink';
import {connect} from 'react-redux';

class Past extends React.Component {

  render() {
    let pastList = {this.props.allPastList};
    for (var i = 0; i < pastList.length; i++) {
      pastList.push(<OnePastContact />)
    }
    return (
      <div>
        <div className="allPast">
          {pastList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allPastList: AllPastState.allPast
});

export default connect(mapStateToProps)(Past);
