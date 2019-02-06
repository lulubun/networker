import React from 'react';
import {Link} from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ActionFavorite from 'material-ui/svg-icons/alert/error';
import ActionFavoriteBorder from 'material-ui/svg-icons/alert/error-outline';
import Checkbox from 'material-ui/Checkbox';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
const JobsTable = (props) => (
  <Table
  //  onCellClick={(rowNum, colId) => {
  //    if (colId !== 1) {
  //     // console.log('link to', props.jobs[rowNum], props)
  //     props.router.push(`/${props.user}/one_job/${props.jobs[rowNum]._id}`)
  //    }
  //   }}
   selectable={false}
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn>Important</TableHeaderColumn>
        <TableHeaderColumn>Company</TableHeaderColumn>
        <TableHeaderColumn>Next Scheduled Followup</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
    >
    {props.jobs.map((job) =>
            (
              <TableRow key={job._id} style={{
                backgroundColor: job.stage === 'Inactive' ? 'gray' : null,
              }}>
                <TableRowColumn>
                  <Checkbox
                    checked={job.important}
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    onCheck={() => {
                      props.updateHeart(props.user, job._id, !job.important, job.nextDate)
                    }}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <Link to={`/${props.user}/one_job/${job._id}`} className="LinkBlack">
                    {job.company}
                  </Link>
                </TableRowColumn>
              <TableRowColumn>{job.nextDate}</TableRowColumn>
            </TableRow>
          ))}

    </TableBody>
  </Table>
);

export default JobsTable;