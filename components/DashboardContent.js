import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import GraphChart from './GraphChart';
import BrewingProcesses from './BrewingProcesses';

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
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          {this.props.activeWindow}
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          {this.returnActiveWindow()}
        </Typography>
      </div>
    );
  }
}

DashboardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  activeWindow: PropTypes.object.isRequired
};

export default withStyles()(DashboardContent);
