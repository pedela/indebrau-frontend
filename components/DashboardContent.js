import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GraphChart from './GraphChart';
import BrewingProcesses from './BrewingProcesses';

const styles = theme => ({});

class DashboardContent extends Component {
  returnActiveWindow = () => {
    if (this.props.activeWindow == 'GraphChart') {
      return <GraphChart />;
    }
    if (this.props.activeWindow == 'BrewingProcesses') {
      return <BrewingProcesses />;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Typography variant="h4" gutterBottom component="h2">
          {this.props.activeWindow}
        </Typography>
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
