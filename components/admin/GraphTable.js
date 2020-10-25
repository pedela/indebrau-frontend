import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import DeleteGraph from './DeleteGraph';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    maxHeight: '100%',
    overflowX: 'auto',
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
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Details</TableCell>
              <TableCell align='center' />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.graphs.map((n) => (
              <TableRow key={n.id}>
                <TableCell align='center'>{n.id}</TableCell>
                <TableCell align='center'>Name: {n.sensorName} Step: {n.brewingStep.name} Process: {n.brewingStep.brewingProcess.id} Update: {n.updateFrequency} Sec</TableCell>
                <TableCell align='center'>
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
