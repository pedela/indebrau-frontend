import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  withStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import {
  ALL_BREWING_PROCESSES_QUERY,
  DELETE_BREWING_PROCESS_MUTATION
} from '../../lib/queriesAndMutations';

const styles = theme => ({
  layout: {
    width: 'auto',
    textAlign: 'center',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
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

class DeleteBrewingProcess extends Component {
  state = {
    open: false,
    queryError: null
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
      queryError: null
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Fab
          aria-label="Delete"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <DeleteIcon />
        </Fab>
        <Mutation
          mutation={DELETE_BREWING_PROCESS_MUTATION}
          refetchQueries={[{ query: ALL_BREWING_PROCESSES_QUERY }]}
        >
          {(deleteBrewingProcess, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">
                Delete Brewing Process
              </DialogTitle>
              <DialogContent>
                <main className={classes.layout}>
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
                        await deleteBrewingProcess({
                          variables: {
                            id: this.props.id
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
                      Delete
                    </Button>
                  </div>
                </main>
              </DialogContent>
            </Dialog>
          )}
        </Mutation>
      </>
    );
  }
}

DeleteBrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(DeleteBrewingProcess);
