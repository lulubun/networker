import React from 'react';
import OnePastContact from './OnePastContact';
import ContactLink from './ContactLink';
import {connect} from 'react-redux';

class Past extends React.Component {

  render() {
    const pastList = {allPastList};
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
});

export default connect(mapStateToProps)(Past);
