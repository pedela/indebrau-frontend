import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './Error';
import { ACTIVE_GRAPHS_QUERY, ALL_GRAPHS_QUERY } from './AllGraphs';

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

const CREATE_GRAPH_MUTATION = gql`
  mutation CREATE_GRAPH_MUTATION(
    $name: String!
    $sensorName: String!
    $updateFrequency: Int
    $brewingProcessId: ID!
  ) {
    createGraph(
      name: $name
      sensorName: $sensorName
      updateFrequency: $updateFrequency
      brewingProcessId: $brewingProcessId
    ) {
      id
    }
  }
`;

class CreateGraph extends React.Component {
  state = {
    open: false,
    queryError: null,

    // mutation variables
    name: '',
    sensorName: '',
    updateFrequency: 60,
    brewingProcessId: ''
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({
      open: false,
      queryError: null,

      // mutation variables
      name: '',
      sensorName: '',
      updateFrequency: '',
      brewingProcessId: ''
    });
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
          <AddIcon />
        </Fab>
        <Mutation
          mutation={CREATE_GRAPH_MUTATION}
          refetchQueries={[{ query: ACTIVE_GRAPHS_QUERY, ALL_GRAPHS_QUERY }]}
        >
          {(createGraph, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              disableBackdropClick
              fullScreen
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">Create Graph</DialogTitle>

              <DialogContent>
                <main className={classes.layout}>
                  <Paper className={classes.paper}>
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
                          id="sensorName"
                          name="sensorName"
                          label="Sensor Name"
                          value={this.state.sensorName}
                          onChange={this.saveToState}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="updateFrequency"
                          name="updateFrequency"
                          label="Update Frequency"
                          value={this.state.updateFrequency}
                          onChange={this.saveToState}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="brewingProcessId"
                          name="brewingProcessId"
                          label=" Brewing Process Id"
                          value={this.state.brewingProcessId}
                          onChange={this.saveToState}
                          fullWidth
                        />
                      </Grid>
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
                          await createGraph({
                            variables: {
                              name: this.state.name,
                              sensorName: this.state.sensorName,
                              updateFrequency: parseInt(
                                this.state.updateFrequency
                              ),
                              brewingProcessId: this.state.brewingProcessId
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
                        Create
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

CreateGraph.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateGraph);
