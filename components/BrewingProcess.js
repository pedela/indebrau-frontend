import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BreweryComponent from './BreweryComponent';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    flexGrow: 1
  },
  container: {}
});

class BrewingProcess extends Component {
  render() {
    const { classes } = this.props;
    // all rights checks done in corresponding page, no need to check again
    // (on frontend)
    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Brewing Process: {this.props.brewingProcessId}
        </Typography>
        <Grid
          container
          className={classes.container}
          spacing={8}
          justify="center"
        >
          <Grid item>
            <BreweryComponent
              type="GrainMill"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
          <Grid item>
            <BreweryComponent
              type="MashTun"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
          <Grid item>
            <BreweryComponent
              type="SpargingVessel"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
          <Grid item>
            <BreweryComponent
              type="WortCopper"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
          <Grid item>
            <BreweryComponent
              type="WortChiller"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
          <Grid item>
            <BreweryComponent
              type="Fermenter"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
          <Grid item>
            <BreweryComponent
              type="ElectronicHydrometer"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
          <Grid item>
            <BreweryComponent
              type="Keg"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
          <Grid item>
            <BreweryComponent
              type="Bottle"
              brewingProcessId={this.props.brewingProcessId}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

BrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired,
  brewingProcessId: PropTypes.string.isRequired
};

export default withStyles(styles)(BrewingProcess);
