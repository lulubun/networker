import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as actions from '../actions/contactActions';
import {Link} from 'react-router';


const style = {
  padding: 20,
  margin: 20,
};

class Past extends React.Component {
  render() {
  let user = '';
  let contactId = '';
  let pastId = '';
  let array = this.props.allPastList;
  let sortedArray;
  if (array == []) {
    sortedArray = []
  } else {
    sortedArray = array.sort(function(a, b) {return Date.parse(a.serDateContact) - Date.parse(b.serDateContact)});
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
  allPastList: state.ContactState.allPast
});

const mapDispatchToProps = (dispatch) => ({
  delete: (userOne, contactId, oneId) => dispatch(actions.fetchDeletePast(userOne, contactId, oneId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Past);
