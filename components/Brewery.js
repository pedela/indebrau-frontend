import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BreweryComponent from './BreweryComponent';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    flexGrow: 1
  },
  container: {}
});
class Brewery extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          The Indebrau Brewery
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          An Overview of our Setup
        </Typography>
        <Grid
          container
          className={classes.container}
          spacing={1}
          justify="center"
        >
          <Grid item>
            <BreweryComponent type="GrainMill" />
          </Grid>
          <Grid item>
            <BreweryComponent type="MashTun" />
          </Grid>
          <Grid item>
            <BreweryComponent type="SpargingVessel" />
          </Grid>
          <Grid item>
            <BreweryComponent type="Pump" />
          </Grid>
          <Grid item>
            <BreweryComponent type="WortCopper" />
          </Grid>
          <Grid item>
            <BreweryComponent type="WortChiller" />
          </Grid>
          <Grid item>
            <BreweryComponent type="Fermenter" />
          </Grid>
          <Grid item>
            <BreweryComponent type="ElectronicHydrometer" />
          </Grid>
          <Grid item>
            <BreweryComponent type="Keg" />
          </Grid>
          <Grid item>
            <BreweryComponent type="Bottle" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Brewery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Brewery);
