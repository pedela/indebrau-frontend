import { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import PlayIcon from '@material-ui/icons/PlayArrowOutlined';
import {
  Fab,
  withStyles
} from '@material-ui/core';
import Error from '../Error';
import {
  ALL_BREWING_PROCESSES_QUERY,
  ADVANCE_BREWING_PROCESS_MUTATION,
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  ALL_MEDIA_STREAMS_QUERY
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

class AdvanceBrewingProcess extends Component {
  state = {
    queryError: null
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      queryError: null
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Mutation
          mutation={ADVANCE_BREWING_PROCESS_MUTATION}
          refetchQueries={[
            { query: ALL_BREWING_PROCESSES_QUERY},
            { query: ACTIVE_GRAPHS_QUERY},
            { query: ALL_GRAPHS_QUERY},
            { query: ALL_MEDIA_STREAMS_QUERY}

          ]}
        >
          {(advanceBrewingProcess, { loading }) => (
            <>
              <Fab
                color='primary'
                aria-label='Add'
                className={classes.fab}
                onClick={async () => {
                // fire mutation (clear old error)
                  this.setState({ queryError: null });
                  await advanceBrewingProcess({
                    variables: {
                      brewingProcessId: this.props.brewingProcessId,
                    }
                  }).catch((e) => {
                    this.setState({ queryError: e });
                  });
                }}
                disabled={loading}
              >
                <PlayIcon                 disabled={loading}
                />
              </Fab>
              <Error error={this.state.queryError} />
            </>
          )}
        </Mutation>
      </>
    );
  }
}

AdvanceBrewingProcess.propTypes = {
  classes: PropTypes.object.isRequired,
  brewingProcessId: PropTypes.string.isRequired
};

export default withStyles(styles)(AdvanceBrewingProcess);
