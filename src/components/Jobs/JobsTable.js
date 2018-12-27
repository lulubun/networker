import React from 'react';
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
   onCellClick={(rowNum, colId) => {
     if (colId !== 1) {
      console.log('link to', props.jobs[rowNum])
     }
    }}
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
              <TableRow key={job._id}>
                <TableRowColumn>
                  <Checkbox
                    checked={job.serImportant}
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    onCheck={() => console.log(job.serImportant)}
                  />
                </TableRowColumn>
                <TableRowColumn>{job.serCompany}</TableRowColumn>
              <TableRowColumn>{job.serNextDate}</TableRowColumn>
            </TableRow>
          ))}

    </TableBody>
  </Table>
);

export default JobsTable;