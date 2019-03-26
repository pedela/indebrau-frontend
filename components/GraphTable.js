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

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
    maxHeight: '100%'
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class GraphTable extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Sensor Name</TableCell>
            <TableCell align="center">Active</TableCell>
            <TableCell align="center">Update Frequency</TableCell>
            <TableCell align="center">Linked Brewing Process</TableCell>
            <TableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.graphs.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.id}
              </TableCell>
              <TableCell align="right">{n.name}</TableCell>
              <TableCell align="right">{n.sensorName}</TableCell>
              <TableCell align="right">{n.active.toString()}</TableCell>
              <TableCell align="right">{n.updateFrequency}</TableCell>
              <TableCell align="right">{n.brewingProcess.id}</TableCell>
              <TableCell align="right">
                <Fab
                  color="secondary"
                  aria-label="Edit"
                  className={classes.fab}
                >
                  <EditIcon />
                </Fab>
                <Fab aria-label="Delete" className={classes.fab}>
                  <DeleteIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

GraphTable.propTypes = {
  graphs: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GraphTable);
