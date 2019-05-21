import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AllGraphs from './AllGraphs';
import AllBrewingProcesses from './AllBrewingProcesses';
import AllMediaStreams from './AllMediaStreams';


const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    maxHeight: '100%'
  }
});

class DashboardContent extends Component {
  returnActiveWindow = () => {
    if (this.props.activeWindow == 'AllGraphs') {
      return <AllGraphs />;
    }
    if (this.props.activeWindow == 'AllBrewingProcesses') {
      return <AllBrewingProcesses />;
    }
    if (this.props.activeWindow == 'AllMediaStreams') {
      return <AllMediaStreams />;
    }
    return (
      <Paper className={this.props.classes.root}>
        <Typography variant="h5" gutterBottom>
          Admin Area
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          please choose your view
        </Typography>
      </Paper>
    );
  };

  render() {
    return this.returnActiveWindow();
  }
}

DashboardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  activeWindow: PropTypes.string.isRequired
};

export default withStyles(styles)(DashboardContent);
