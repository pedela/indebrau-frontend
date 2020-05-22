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
import DeleteMediaStream from './DeleteMediaStream';

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

class MediaStreamTable extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Media File Name</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Update Frequency</TableCell>
              <TableCell align="center">Linked Brewing Process</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.mediaStreams.map(n => (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.id}
                </TableCell>
                <TableCell align="center">{n.mediaFilesName}</TableCell>
                <TableCell align="center">{n.active.toString()}</TableCell>
                <TableCell align="center">{n.updateFrequency}</TableCell>
                <TableCell align="center">{n.brewingProcess.id}</TableCell>
                <TableCell align="center">
                  <Fab
                    color="secondary"
                    aria-label="Edit"
                    className={classes.fab}
                  >
                    <EditIcon />
                  </Fab>
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
