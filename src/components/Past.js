import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {
  padding: 20,
  margin: 20,
};

class Past extends React.Component {
  render() {
    return (
        <div className="allPast">
          {this.props.allPastList.map((onePast, index) => (
          <div className="onePast" key={index}>
            <Paper style={style} zDepth={1}>
            <p>{onePast.serTypeContact} on {onePast.serDateContact}</p>
            <Divider />
            <p>{onePast.serNotesContact}</p>
            <RaisedButton label="Edit" />
          </Paper>
          </div>))}
        </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allPastList: state.ContactState.allPast
});

export default connect(mapStateToProps)(Past);
