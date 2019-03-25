import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Loading from './Loading';
import Error from './Error';
import BrewingProcessTable from './BrewingProcessTable';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    paddingTop: theme.spacing.unit * 2,
    maxHeight: '100%'
  },
  fab: {
    margin: theme.spacing.unit
  }
});

const BREWING_PROCESSES_QUERY = gql`
  query BREWING_PROCESSES_QUERY {
    brewingProcesses {
      id
      name
      start
      description
      end
    }
  }
`;

class AllBrewingProcesses extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Query query={BREWING_PROCESSES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            // success!
            return (
              <Paper className={classes.root}>
                <BrewingProcessTable brewingProcesses={data.brewingProcesses} />
              </Paper>
            );
          }}
        </Query>
        <Paper className={classes.root}>
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Paper>
      </div>
    );
  }
}

AllBrewingProcesses.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllBrewingProcesses);
