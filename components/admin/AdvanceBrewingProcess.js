import { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import PlayIcon from '@material-ui/icons/PlayArrowOutlined';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import {
  ALL_BREWING_PROCESSES_QUERY,
  ADVANCE_BREWING_PROCESS_MUTATION
} from '../../lib/queriesAndMutations';

const styles = theme => ({
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(1) / 4
  },
  noLabel: {
    marginTop: theme.spacing(3)
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

// TODO: Read steps (and currently active steps) from backend!
const STEPS = [
  'MALT_CRUSHING',
  'HEATING_UP',
  'MASH_IN',
  'MASHING',
  'HEATING_SPARGE',
  'LAUTERING',
  'SPARGING',
  'BOILING',
  'CHILLING',
  'FERMENTING',
  'CONDITIONING',
  'BOTTLED'
];

class AdvanceBrewingProcess extends Component {
  state = {
    open: false,
    queryError: null,
    newActiveSteps: this.props.activeSteps
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      newActiveSteps: this.props.activeSteps
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      queryError: null
    });
  };

  handleNewActiveSteps = event => {
    this.setState({ newActiveSteps: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <PlayIcon />
        </Fab>
        <Mutation
          mutation={ADVANCE_BREWING_PROCESS_MUTATION}
          refetchQueries={[{ query: ALL_BREWING_PROCESSES_QUERY }]}
        >
          {(advanceBrewingProcess, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              disableBackdropClick
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">
                Advance Brewing Process
              </DialogTitle>

              <DialogContent>
                <main className={classes.layout}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={8}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-chip">
                          Steps
                        </InputLabel>
                        <Select
                          multiple
                          value={this.state.newActiveSteps}
                          onChange={this.handleNewActiveSteps}
                          input={<Input id="select-multiple-chip" />}
                          renderValue={selected => (
                            <div className={classes.chips}>
                              {selected.map(value => (
                                <Chip
                                  key={value}
                                  label={value}
                                  className={classes.chip}
                                />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {STEPS.map(step => (
                            <MenuItem key={step} value={step}>
                              {step}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <div className={classes.buttons}>
                      <Button
                        onClick={this.handleClose}
                        className={classes.button}
                        color="secondary"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          // fire mutation (clear old error)
                          this.setState({ queryError: null });
                          await advanceBrewingProcess({
                            variables: {
                              id: this.props.id,
                              newActiveSteps: this.state.newActiveSteps
                            }
                          }).catch(e => {
                            this.setState({ queryError: e });
                          });
                          if (this.state.queryError == null) {
                            this.handleClose();
                          }
                        }}
                        className={classes.button}
                        disabled={loading}
                      >
                        Advance!
                      </Button>
                    </div>
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

AdvanceBrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  activeSteps: PropTypes.array.isRequired
};

export default withStyles(styles)(AdvanceBrewingProcess);
