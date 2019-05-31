import { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  withStyles
} from '@material-ui/core';
import Error from '../Error';
import {
  ALL_MEDIA_STREAMS_QUERY,
  DELETE_MEDIA_STREAM_MUTATION
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

class DeleteMediaStream extends Component {
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
          mutation={DELETE_MEDIA_STREAM_MUTATION}
          refetchQueries={[
            { query: ALL_MEDIA_STREAMS_QUERY }
          ]}
        >
          {(deleteMediaStream, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">Delete Media Stream</DialogTitle>
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
                        await deleteMediaStream({
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

DeleteMediaStream.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(DeleteMediaStream);
