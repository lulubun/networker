import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as actions from '../actions/contactActions';
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
      sortedArray = array.sort(function(a, b) {return Date.parse(b.serDateContact) - Date.parse(a.serDateContact)});
    }

    if (sortedArray.length > 2) {
      return (
        <div className="allPast">
          <Columns>
          {sortedArray.map((onePast, index) => (
          <div className="onePast" key={index}>
            <Paper style={style} zDepth={1}>
            <p>{onePast.serTypeContact} on {onePast.serDateContact}</p>
            <Divider />
            <p>{onePast.serNotesContact}</p>
            <RaisedButton label="Delete"
              backgroundColor="#5D576B" labelColor="#F1F1EF"
              onTouchTap={(event) => {
                this.props.delete(onePast.serUser, onePast._id, onePast.pastId)
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
          <p>{onePast.serTypeContact} on {onePast.serDateContact}</p>
          <Divider />
          <p>{onePast.serNotesContact}</p>
          <RaisedButton label="Delete"
            backgroundColor="#5D576B" labelColor="#F1F1EF"
            onTouchTap={(event) => {
              this.props.delete(onePast.serUser, onePast._id, onePast.pastId)
            }}
          />
        </Paper>
        </div>))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allPastList: state.AllState.allPast
});

const mapDispatchToProps = (dispatch) => ({
  delete: (userOne, contactId, oneId) => dispatch(actions.fetchDeletePast(userOne, contactId, oneId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Past);
