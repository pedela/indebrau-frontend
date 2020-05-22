import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import DeleteBrewingProcess from './admin/DeleteBrewingProcess';
import AdvanceBrewingProcess from './admin/AdvanceBrewingProcess';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    maxHeight: '100%',
    overflowX: 'auto'
  },
  fab: {
    margin: theme.spacing(1)
  }
});

class BrewingProcessTable extends Component {
  handleClick = id => {
    Router.push(
      {
        pathname: '/brewingProcess',
        query: { brewingProcessId: id }
      },
      '/brewingProcess'
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {this.props.adminView && <TableCell align="center">ID</TableCell>}
              <TableCell align="center">Name</TableCell>
              {!this.props.adminView && (
                <TableCell align="center">Description</TableCell>
              )}
              {this.props.adminView && <TableCell align="center" />}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.brewingProcesses.map(n => (
              <TableRow key={n.id} hover>
                {this.props.adminView && (
                  <TableCell align="center">{n.id}</TableCell>
                )}
                <TableCell
                  align="center"
                  onClick={() => this.handleClick(n.id)}
                >
                  {n.name}
                </TableCell>
                {!this.props.adminView && (
                  <TableCell
                    align="center"
                    onClick={() => this.handleClick(n.id)}
                  >
                    {n.description}
                  </TableCell>
                )}
                {this.props.adminView && (
                  <TableCell align="center">
                    <DeleteBrewingProcess id={n.id} />
                    <AdvanceBrewingProcess
                      id={n.id}
                      activeSteps={n.activeSteps}
                    />
                  </TableCell>
                )}
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
