import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    flexGrow: 1
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '100 100 100'
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

class Brewery extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.container} spacing={8}>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/grainMill.png"
                title="Grain Mill"
              />
              <Typography>The Grain Mill</Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/mashTun.png"
                title="Mash Tun"
              />
              <Typography>The Mash Tun</Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/spargingVessel.png"
                title="Sparging Vessel"
              />
              <Typography>The Sparging Vessel</Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/wortCopper.png"
                title="Wort Copper"
              />
              <Typography>The Wort Copper</Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/cooler.png"
                title="Wort Chiller"
              />
              <Typography>The Wort Chiller</Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/fermenter.png"
                title="Fermenter"
              />
              <Typography>The Fermenter</Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/spindle.png"
                title="Electronic Spindle"
              />
              <Typography>The Electronic Spindle</Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/keg.png"
                title="The Keg"
              />
              <Typography>The Keg</Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.item}>
            <Paper>
              <img
                className={classes.media}
                src="../static/breweryImages/bottle.png"
                title="Beer Bottle"
              />
              <Typography>..And Finally Beer</Typography>
            </Paper>
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
