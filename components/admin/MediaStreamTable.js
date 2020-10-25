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
import DeleteMediaStream from './DeleteMediaStream';

const styles = (theme) => ({
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

class MediaStreamTable extends Component {
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
            {this.props.mediaStreams.map((n) => (
              <TableRow key={n.id}>
                <TableCell align='center'>{n.id}</TableCell>
                <TableCell align='center'>Name: {n.mediaFilesName} Step: {n.brewingStep.name} Process: {n.brewingStep.brewingProcess.id} Update: {n.updateFrequency} Sec</TableCell>
                <TableCell align='center'>
                  <DeleteMediaStream id={n.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

MediaStreamTable.propTypes = {
  mediaStreams: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaStreamTable);
