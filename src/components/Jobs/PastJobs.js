import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as actions from '../../actions/jobActions';
import Columns from 'react-columns';



const style = {
  padding: 20,
  margin: 20,
};

class Past extends React.Component {
  render() {
    let array = this.props.allPastList;
    let sortedArray;
    if (array == undefined) {
      sortedArray = []
    } else {
      sortedArray = array.sort(function(a, b) {return Date.parse(b.serDateNext) - Date.parse(a.serDateNext)});
    }

    if (sortedArray.length > 2) {
      return (
        <div className="allPast">
          <Columns>
          {sortedArray.map((onePast, index) => (
          <div className="onePast" key={index}>
            <Paper style={style} zDepth={1}>
            <p>{onePast.serTypeJob} on {onePast.serDateNext}</p>
            <Divider />
            <p>{onePast.serNotesJob}</p>
            <RaisedButton label="Delete"
              backgroundColor="#5D576B" labelColor="#F1F1EF"
              onTouchTap={(event) => {
                this.props.delete(onePast.serUser, onePast.id, onePast.pastId)
              }}
            />
          </Paper>
          </div>))}
          </Columns>
        </div>
      );
    }
    return (
      <div className="allPast">
        {sortedArray.map((onePast, index) => (
        <div className="onePast" key={index}>
          <Paper style={style} zDepth={1}>
          <p>{onePast.serTypeJob} on {onePast.serDateNext}</p>
          <Divider />
          <p>{onePast.serNotesJob}</p>
          <RaisedButton label="Delete"
            backgroundColor="#5D576B" labelColor="#F1F1EF"
            onTouchTap={(event) => {
              this.props.delete(onePast.serUser, onePast.id, onePast.pastId)
            }}
          />
        </Paper>
        </div>))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allPastList: state.JobState.allPastState
});

const mapDispatchToProps = (dispatch) => ({
  delete: (userOne, jobId, oneId) => dispatch(actions.fetchDeletePast(userOne, jobId, oneId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Past);
