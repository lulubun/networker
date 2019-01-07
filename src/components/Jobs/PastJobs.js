import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import * as actions from '../../actions/jobActions';

class Past extends React.Component {
  render() {
    const { allPastList } = this.props;
    const sortedArray = ((allPastList && allPastList.length > 0) && allPastList.sort(function(a, b) {return Date.parse(b.serDateNext) - Date.parse(a.serDateNext)})) || [];
    return (
      <Table
        selectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn>Notes</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {sortedArray.map((onePast) =>(
              <TableRow key={onePast.pastId}>
              <TableRowColumn>{onePast.serDateNext}</TableRowColumn>
              <TableRowColumn>{onePast.serTypeJob}</TableRowColumn>
              <TableRowColumn>{onePast.serNotesJob}</TableRowColumn>
              <TableRowColumn>
                <RaisedButton label="Delete"
                  backgroundColor="#5D576B" labelColor="#F1F1EF"
                  onTouchTap={(event) => {
                    this.props.delete(onePast.serUser, onePast.id, onePast.pastId)
                  }}
                />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
