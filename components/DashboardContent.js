import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ActiveGraphs from './ActiveGraphs';
import AllBrewingProcesses from './AllBrewingProcesses';

const styles = theme => ({});

class DashboardContent extends Component {
  returnActiveWindow = () => {
    if (this.props.activeWindow == 'ActiveGraphs') {
      return <ActiveGraphs />;
    }
    if (this.props.activeWindow == 'AllBrewingProcesses') {
      return <AllBrewingProcesses />;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Typography component="div" className={classes.chartContainer}>
          {this.returnActiveWindow()}
        </Typography>
      </Paper>
    );
  }
}

DashboardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  activeWindow: PropTypes.string.isRequired
};

export default withStyles(styles)(DashboardContent);
