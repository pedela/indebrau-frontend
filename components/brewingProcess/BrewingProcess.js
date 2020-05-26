import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Grid, Typography, withStyles } from '@material-ui/core';
import GrainMill from './GrainMill';
import MashTun from './MashTun';
import SpargingVessel from './SpargingVessel';
import Pump from './Pump';
import WortCopper from './WortCopper';
import WortChiller from './WortChiller';
import Fermenter from './Fermenter';
import ElectronicHydrometer from './ElectronicHydrometer';
import Keg from './Keg';
import Bottle from './Bottle';
import Loading from '../Loading';
import Error from '../Error';
import { BREWING_PROCESS_QUERY } from '../../lib/queriesAndMutations';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
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
        <Query
          query={BREWING_PROCESS_QUERY}
          variables={{ id: this.props.brewingProcessId }}
          pollInterval={10000}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data && data.brewingProcess) {
              let { brewingProcess } = data;
              let {
                brewingProcessDetails,
                graphs,
                activeSteps
              } = brewingProcess;
              // return components - please mind that graph parsing
              // and data correctness checking is done inside
              // components, this is just a preselection
              return (
                <>
                  <Typography variant='h5' gutterBottom>
                    {brewingProcess.name}
                  </Typography>
                  <Grid
                    container
                    className={classes.container}
                    spacing={1}
                    justify='center'
                  >
                    <Grid item>
                      <GrainMill
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <MashTun
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <SpargingVessel
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <Pump
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <WortCopper
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <WortChiller
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <Fermenter
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <ElectronicHydrometer
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <Keg
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                    <Grid item>
                      <Bottle
                        details={brewingProcessDetails}
                        graphs={graphs}
                        activeSteps={activeSteps}
                      />
                    </Grid>
                  </Grid>
                </>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

BrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired,
  brewingProcessId: PropTypes.string.isRequired
};

export default withStyles(styles)(BrewingProcess);
