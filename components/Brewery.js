import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { CurrentUser } from './User';
import BreweryComponent from './BreweryComponent';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    flexGrow: 1
  },
  container: {}
});
class Brewery extends Component {
  state = {
    brewingProcessId: ''
  };

  // might have been set in user page, fetch, set state and remove
  componentDidMount() {
    this.setState({
      brewingProcessId: sessionStorage.getItem('brewingProcessId')
    });
    sessionStorage.removeItem('brewingProcessId');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CurrentUser>
          {({ data }) => {
            const me = data ? data.me : null;
            // check for permissions here
            // 1. logged in
            let permission = false;
            if (me) {
              // 2. no admin
              if (me.permissions.includes('ADMIN')) {
                permission = true;
              }
              else {
                // does user participate?
                me.participatingBrewingProcesses.map(brewingProcess => {
                  if (brewingProcess.id === this.state.brewingProcessId) {
                    permission = true;
                  }
                });
              }
            }
            if (!permission) {
              this.setState({ brewingProcessId: null });
            }
            // clear all brewing process data and show default brewery
            return (
              <>
                {this.state.brewingProcessId && (
                  <Typography variant="h5" gutterBottom>
                    Brewing Process: {this.state.brewingProcessId}
                  </Typography>
                )}
                {!this.state.brewingProcessId && (
                  <>
                    <Typography variant="h5" gutterBottom>
                      The Indebrau Brewery
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      An Overview of our Setup
                    </Typography>
                  </>
                )}
                <Grid
                  container
                  className={classes.container}
                  spacing={8}
                  justify="center"
                >
                  <Grid item>
                    <BreweryComponent
                      type="GrainMill"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                  <Grid item>
                    <BreweryComponent
                      type="MashTun"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                  <Grid item>
                    <BreweryComponent
                      type="SpargingVessel"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                  <Grid item>
                    <BreweryComponent
                      type="WortCopper"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                  <Grid item>
                    <BreweryComponent
                      type="WortChiller"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                  <Grid item>
                    <BreweryComponent
                      type="Fermenter"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                  <Grid item>
                    <BreweryComponent
                      type="ElectronicHydrometer"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                  <Grid item>
                    <BreweryComponent
                      type="Keg"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                  <Grid item>
                    <BreweryComponent
                      type="Bottle"
                      brewingProcessId={this.state.brewingProcessId}
                    />
                  </Grid>
                </Grid>
              </>
            );
          }}
        </CurrentUser>
      </div>
    );
  }
}

Brewery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Brewery);
