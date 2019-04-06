import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BreweryComponent from './BreweryComponent';
import Loading from '../Loading';
import Error from '../Error';
import { BREWING_PROCESS_QUERY } from '../../lib/queriesAndMutations';

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
        <Query
          query={BREWING_PROCESS_QUERY}
          variables={{ id: this.props.brewingProcessId }}
          pollInterval={10000}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data && data.brewingProcess) {
              let brewingProcess = data.brewingProcess;
              // return components - please mind that graph parsing
              // and data correctness checking is done inside
              // components, this is just a preselection
              return (
                <>
                  <Typography variant="h5" gutterBottom>
                    {brewingProcess.name}
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
                        details={this.props.brewingProcessId}
                      />
                    </Grid>
                    <Grid item>
                      <BreweryComponent
                        type="MashTun"
                        brewingProcessId={this.props.brewingProcessId}
                        details={{
                          mashWaterLiter: brewingProcess.mashWaterLiter,
                          mashInTemperature: brewingProcess.mashInTemperature,
                          mashSteps: brewingProcess.mashSteps
                        }}
                        graphs={brewingProcess.graphs}
                      />
                    </Grid>
                    <Grid item>
                      <BreweryComponent
                        type="SpargingVessel"
                        details={this.props.brewingProcessId}
                      />
                    </Grid>
                    <Grid item>
                      <BreweryComponent
                        type="WortCopper"
                        details={this.props.brewingProcessId}
                      />
                    </Grid>
                    <Grid item>
                      <BreweryComponent
                        type="WortChiller"
                        details={this.props.brewingProcessId}
                      />
                    </Grid>
                    <Grid item>
                      <BreweryComponent
                        type="Fermenter"
                        details={{
                          dryHopping: brewingProcess.dryHopAddition,
                          fermentationSteps: brewingProcess.fermentationSteps,
                          originalExtractPlato:
                            brewingProcess.originalExtractPlato,
                          pitchingTemperature:
                            brewingProcess.pitchingTemperature,
                          alcoholPercent: brewingProcess.alcoholPercent,
                          conditioningDays: brewingProcess.conditioningDays
                        }}
                        activeBrewingProcess={true}
                        graphs={brewingProcess.graphs}
                      />
                    </Grid>
                    <Grid item>
                      <BreweryComponent
                        type="ElectronicHydrometer"
                        details={this.props.brewingProcessId}
                      />
                    </Grid>
                    <Grid item>
                      <BreweryComponent
                        type="Keg"
                        details={this.props.brewingProcessId}
                      />
                    </Grid>
                    <Grid item>
                      <BreweryComponent
                        type="Bottle"
                        details={this.props.brewingProcessId}
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
