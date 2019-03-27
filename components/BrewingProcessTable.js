import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { renderDate } from '../lib/utils.js';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    maxHeight: '100%',
    overflowX: 'auto'
  },
  fab: {
    margin: theme.spacing.unit
  }
});

class BrewingProcessTable extends Component {
  render() {
    const { classes } = this.props;
    let adminHead = null;
    let adminCell = null;
    if (this.props.adminView) {
      adminHead = <TableCell align="center">Edit</TableCell>;
      adminCell = (
        <TableCell align="right">
          <Fab color="secondary" aria-label="Edit" className={classes.fab}>
            <EditIcon />
          </Fab>
          <Fab aria-label="Delete" className={classes.fab}>
            <DeleteIcon />
          </Fab>
        </TableCell>
      );
    }
    return (
      <div className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Start</TableCell>
              <TableCell align="center">End</TableCell>
              {adminHead}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.brewingProcesses.map(n => (
              <TableRow key={n.id}>
                <TableCell align="center">{n.name}</TableCell>
                <TableCell align="center">{n.description}</TableCell>
                <TableCell align="center">{renderDate(n.start)}</TableCell>
                <TableCell align="center">{n.end}</TableCell>
                {adminCell}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

BrewingProcessTable.propTypes = {
  brewingProcesses: PropTypes.array.isRequired,
  adminView: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrewingProcessTable);
