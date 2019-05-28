import { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { ACTIVE_GRAPHS_QUERY, ALL_GRAPHS_QUERY, DELETE_GRAPH_MUTATION } from '../../lib/queriesAndMutations';

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

class CreateGraph extends Component {
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
          mutation={DELETE_GRAPH_MUTATION}
          refetchQueries={[
            { query: ACTIVE_GRAPHS_QUERY },
            { query: ALL_GRAPHS_QUERY }
          ]}
        >
          {(deleteGraph, { loading }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Error error={this.state.queryError} />
              <DialogTitle id="form-dialog-title">Delete Graph</DialogTitle>
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
                        await deleteGraph({
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

CreateGraph.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(CreateGraph);
