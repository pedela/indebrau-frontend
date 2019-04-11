import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Router from 'next/router';
import DeleteBrewingProcess from './admin/DeleteBrewingProcess';
import AdvanceBrewingProcess from './admin/AdvanceBrewingProcess';

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
        <Table>
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
                    <DeleteBrewingProcess  id={n.id} />
                    <AdvanceBrewingProcess id={n.id} />
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
