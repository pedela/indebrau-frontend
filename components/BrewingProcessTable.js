import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { renderDate } from '../lib/utils.js';

class BrewingProcessTable extends Component {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Start</TableCell>
            <TableCell align="center">End</TableCell>
            <TableCell align="center">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.brewingProcesses.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.id}
              </TableCell>
              <TableCell align="right">{n.name}</TableCell>
              <TableCell align="right">{renderDate(n.start)}</TableCell>
              <TableCell align="right">{n.end}</TableCell>
              <TableCell align="right">{n.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

BrewingProcessTable.propTypes = {
  brewingProcesses: PropTypes.array.isRequired
};

export default BrewingProcessTable;
