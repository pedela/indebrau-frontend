import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  fab: {
    margin: theme.spacing.unit
  }
});

const steps = ['General Info', 'Add Details'];

class CreateBrewingProcess extends React.Component {
  state = {
    open: false,
    activeStep: 0,
    name: '',
    description: '',
    startNow: false,
    mashWaterLiter: '',
    spargingWaterLiter: '',
    yieldsLiter: '',
    mashInTemperature: '',
    mashSteps: '',
    spargingTemperature: '',
    boilingMinutes: '',
    boilHopAdditions: '',
    dryHopping: '',
    fermentationSteps: ''
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  saveCheckToState = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleClickOpen = () => {
    this.setState({ open: true, });
  };

  handleClose = () => {
    this.setState({
      open: false,
      activeStep: 0,
      name: '',
      description: '',
      startNow: false,
      mashWaterLiter: '',
      spargingWaterLiter: '',
      yieldsLiter: '',
      mashInTemperature: '',
      mashSteps: '',
      spargingTemperature: '',
      boilingMinutes: '',
      boilHopAdditions: '',
      dryHopping: '',
      fermentationSteps: ''});
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
    // final step
    if (this.state.activeStep == steps.length - 1) {
      this.handleClose();
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };
  getStepContent = step => {
    switch (step) {
    case 0:
      return (
          <>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description"
                  value={this.state.description}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      id="startNow"
                      name="startNow"
                      value="startNow"
                      checked={this.state.startNow}
                      onChange={this.saveCheckToState('startNow')}
                    />
                  }
                  label="Start Now"
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
                  id="mashWaterLiter"
                  name="mashWaterLiter"
                  label="Mash Water (l)"
                  value={this.state.mashWaterLiter}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="spargingWaterLiter"
                  name="spargingWaterLiter"
                  label="Sparging Water (l)"
                  value={this.state.spargingWaterLiter}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="yieldsLiter"
                  name="yieldsLiter"
                  label="Yield (l)"
                  value={this.state.yieldsLiter}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="carbonizationGramPerLiter"
                  label="Carbonization (g/l)"
                  name="carbonizationGramPerLiter"
                  value={this.state.carbonizationGramPerLiter}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="mashInTemperature"
                  label="Mash-In Temperature"
                  name="mashInTemperature"
                  value={this.state.mashInTemperature}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="mashSteps"
                  label="Mash Steps"
                  name="mashSteps"
                  value={this.state.mashSteps}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="spargingTemperature"
                  label="Sparging Temperature"
                  name="spargingTemperature"
                  value={this.state.spargingTemperature}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="boilingMinutes"
                  label="Boiling (min)"
                  name="boilingMinutes"
                  value={this.state.boilingMinutes}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="boilHopAdditions"
                  label="Boil Hop Additions"
                  name="boilHopAdditions"
                  value={this.state.boilHopAdditions}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="dryHopping"
                  label="Dry Hopping"
                  name="dryHopping"
                  value={this.state.dryHopping}
                  onChange={this.saveToState}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="fermentationSteps"
                  label="Fermentation Steps"
                  name="fermentationSteps"
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
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick
          fullScreen
        >
          <DialogTitle id="form-dialog-title">
            Create Brewing Process
          </DialogTitle>

          <DialogContent>
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map(label => (
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
                      color="secondary"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                        variant="contained"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                    </Button>
                  </div>
                </>
              </Paper>
            </main>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

CreateBrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateBrewingProcess);
