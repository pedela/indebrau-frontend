import { Component } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
  withStyles
} from '@material-ui/core';
import DeleteGraph from './DeleteGraph';
import { renderDate } from '../../lib/utils.js';


const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    maxHeight: '100%',
    overflowX: 'auto'
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
});

class GraphTable extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Last Update</TableCell>
              <TableCell align="center">Last Value</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Frequency</TableCell>
              <TableCell align="center">Sensor Name</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Linked Brewing Process</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.graphs.map(n => (
              <TableRow key={n.id}>
                <TableCell align="right">{n.name}</TableCell>
                <TableCell align="right">{n.graphData[0] && renderDate(n.graphData[0].time)}</TableCell>
                <TableCell align="right">{n.graphData[0] && parseFloat(n.graphData[0].value).toFixed(2)}</TableCell>
                <TableCell align="right">{n.active.toString()}</TableCell>
                <TableCell align="right">{n.updateFrequency} Sec</TableCell>
                <TableCell align="right">{n.sensorName}</TableCell>
                <TableCell align="right">{n.id}</TableCell>
                <TableCell align="right">{n.brewingProcess.id}</TableCell>
                <TableCell align="right">
                  <Fab
                    color="secondary"
                    aria-label="Edit"
                    className={classes.fab}
                  >
                    <EditIcon />
                  </Fab>
                  <DeleteGraph id={n.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

GraphTable.propTypes = {
  graphs: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GraphTable);
