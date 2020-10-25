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

const styles = (theme) => ({
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
  handleClick = (id) => {
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
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Step</TableCell>
              {!this.props.adminView && (
                <TableCell align='center'>Description</TableCell>
              )}
              {this.props.adminView && <TableCell align='center' />}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.brewingProcesses.map((n) => (
              <TableRow key={n.id} hover>
                <TableCell align='center'>
                  {this.props.adminView && n.id+':'} {n.name}
                </TableCell>
                <TableCell align='center' onClick={() => this.handleClick(n.id)}>
                  {n.brewingSteps[0] && n.brewingSteps[0].name}{!n.start && 'inactive'}{n.end && 'ended'}
                </TableCell>
                {!this.props.adminView && (
                  <TableCell align='center'>
                    {n.description}
                  </TableCell>
                )}
                {this.props.adminView && (
                  <TableCell align='center'>
                    <DeleteBrewingProcess id={n.id} />
                    <AdvanceBrewingProcess brewingProcessId={n.id}/>
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
