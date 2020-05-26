import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Dialog,
  DialogContent,
  Fab,
  DialogTitle,
  withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import {
  CREATE_BREWING_PROCESS_MUTATION,
  ALL_BREWING_PROCESSES_QUERY
} from '../../lib/queriesAndMutations';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1)
  }
});

const steps = ['General Info', 'Add Details'];

class CreateBrewingProcess extends Component {
  state = {
    open: false,
    activeStep: 0,
    formatting: 'notyetdone', // check for formatting
    queryStatus: 'notyetdone', // did query pass?

    // BrewingProcess
    name: '',
    description: '',
    startNow: false,

    // BrewingProcessDetails
    malts: '',
    yeast: '',
    mashWaterLiter: '',
    spargingWaterLiter: '',
    yieldsLiter: '',
    carbonizationGramPerLiter: '',
    mashInTemperature: '',
    mashSteps: '',
    spargingTemperature: '',
    boilingMinutes: '',
    boilHopAdditions: '',
    dryHopping: '',
    fermentationSteps: ''
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  saveCheckToState = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      activeStep: 0,
      formatting: 'notyetdone',
      queryStatus: 'notyetdone',

      name: '',
      description: '',
      startNow: false,
      malts: '',
      yeast: '',
      mashWaterLiter: '',
      spargingWaterLiter: '',
      yieldsLiter: '',
      carbonizationGramPerLiter: '',
      mashInTemperature: '',
      mashSteps: '',
      spargingTemperature: '',
      boilingMinutes: '',
      boilHopAdditions: '',
      dryHopping: '',
      fermentationSteps: ''
    });
  };

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1
    }));
    // final step
    if (this.state.activeStep >= steps.length - 1) {
      this.handleClose();
    }
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1
    }));
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='name'
                  name='name'
                  label='Name'
                  value={this.state.name}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id='description'
                  name='description'
                  label='Description'
                  value={this.state.description}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='secondary'
                      id='startNow'
                      name='startNow'
                      value='startNow'
                      checked={this.state.startNow}
                      onChange={this.saveCheckToState('startNow')}
                    />
                  }
                  label='Start Now'
                />
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='mashWaterLiter'
                  name='mashWaterLiter'
                  label='Mash Water (l)'
                  value={this.state.mashWaterLiter}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='spargingWaterLiter'
                  name='spargingWaterLiter'
                  label='Sparging Water (l)'
                  value={this.state.spargingWaterLiter}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='yieldsLiter'
                  name='yieldsLiter'
                  label='Yield (l)'
                  value={this.state.yieldsLiter}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='carbonizationGramPerLiter'
                  label='Carbonization (g/l)'
                  name='carbonizationGramPerLiter'
                  value={this.state.carbonizationGramPerLiter}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='malts'
                  label='Malts'
                  name='malts'
                  value={this.state.malts}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='yeast'
                  label='Yeast'
                  name='yeast'
                  value={this.state.yeast}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='mashInTemperature'
                  label='Mash-In Temperature'
                  name='mashInTemperature'
                  value={this.state.mashInTemperature}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='mashSteps'
                  label='Mash Steps'
                  name='mashSteps'
                  value={this.state.mashSteps}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='spargingTemperature'
                  label='Sparging Temperature'
                  name='spargingTemperature'
                  value={this.state.spargingTemperature}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='boilingMinutes'
                  label='Boiling (min)'
                  name='boilingMinutes'
                  value={this.state.boilingMinutes}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='boilHopAdditions'
                  label='Boil Hop Additions'
                  name='boilHopAdditions'
                  value={this.state.boilHopAdditions}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='dryHopping'
                  label='Dry Hopping'
                  name='dryHopping'
                  value={this.state.dryHopping}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='fermentationSteps'
                  label='Fermentation Steps'
                  name='fermentationSteps'
                  value={this.state.fermentationSteps}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
            </Grid>
          </>
        );
    }
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <>
        <Fab
          color='primary'
          aria-label='Add'
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Mutation
          mutation={CREATE_BREWING_PROCESS_MUTATION}
          refetchQueries={[{ query: ALL_BREWING_PROCESSES_QUERY }]}
        >
          {(createBrewingProcess, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby='form-dialog-title'
              disableBackdropClick
              fullScreen
            >
              <Error error={this.state.queryStatus} />
              <Error error={this.state.formatting} />

              <DialogTitle id='form-dialog-title'>
                Create Brewing Process
              </DialogTitle>

              <DialogContent>
                <main className={classes.layout}>
                  <Paper className={classes.paper}>
                    <Stepper
                      activeStep={activeStep}
                      className={classes.stepper}
                    >
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    <>
                      {this.getStepContent(activeStep)}
                      <div className={classes.buttons}>
                        <Button
                          onClick={this.handleClose}
                          className={classes.button}
                          color='secondary'
                          variant='contained'
                        >
                          Cancel
                        </Button>
                        {activeStep !== 0 && (
                          <Button
                            onClick={this.handleBack}
                            className={classes.button}
                            variant='contained'
                          >
                            Back
                          </Button>
                        )}
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={async () => {
                            // fire mutation
                            if (activeStep == steps.length - 1) {
                              // prepare variables
                              try {
                                let createBrewingProcessVars = {
                                  name: this.state.name,
                                  description: this.state.description,
                                  startNow: this.state.startNow,
                                  brewingProcessDetails: {
                                    malts: JSON.parse(this.state.malts),
                                    yeast: JSON.parse(this.state.yeast),
                                    mashWaterLiter: parseFloat(
                                      this.state.mashWaterLiter
                                    ),
                                    spargingWaterLiter: parseFloat(
                                      this.state.spargingWaterLiter
                                    ),
                                    yieldsLiter: parseFloat(
                                      this.state.yieldsLiter
                                    ),
                                    carbonizationGramPerLiter: parseFloat(
                                      this.state.carbonizationGramPerLiter
                                    ),
                                    mashInTemperature: parseFloat(
                                      this.state.mashInTemperature
                                    ),
                                    mashSteps: JSON.parse(this.state.mashSteps),
                                    spargingTemperature: parseFloat(
                                      this.state.spargingTemperature
                                    ),
                                    boilingMinutes: parseInt(
                                      this.state.boilingMinutes
                                    ),
                                    boilHopAdditions: JSON.parse(
                                      this.state.boilHopAdditions
                                    ),
                                    dryHopping: JSON.parse(
                                      this.state.dryHopping
                                    ),
                                    fermentationSteps: JSON.parse(
                                      this.state.fermentationSteps
                                    )
                                  }
                                };
                                this.setState({
                                  formatting: 'ok'
                                });
                                this.setState({ queryStatus: 'ok' });
                                await createBrewingProcess({
                                  variables: { ...createBrewingProcessVars }
                                }).catch((e) => {
                                  this.setState({ queryStatus: e });
                                });
                              } catch (exception) {
                                this.setState({
                                  formatting: exception
                                });
                              }
                              if (
                                this.state.formatting === 'ok' &&
                                this.state.queryStatus === 'ok'
                              ) {
                                this.handleNext();
                              }
                            } else {
                              this.handleNext();
                            }
                          }}
                          className={classes.button}
                          disabled={loading}
                        >
                          {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                        </Button>
                      </div>
                    </>
                  </Paper>
                </main>
              </DialogContent>
            </Dialog>
          )}
        </Mutation>
      </>
    );
  }
}

CreateBrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateBrewingProcess);
