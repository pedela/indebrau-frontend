import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Loading from './Loading';
import Error from './Error';
import BrewingProcessTable from './BrewingProcessTable';
import CreateBrewingProcess from './CreateBrewingProcess';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing.unit * 2,
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
              <Paper>
                <Typography variant="h5" className={classes.root}>
                  All Brewing Processes
                </Typography>
                <Paper className={classes.root}>
                  <BrewingProcessTable
                    brewingProcesses={data.brewingProcesses}
                    adminView={true}
                  />
                </Paper>
              </Paper>
            );
          }}
        </Query>
        <Paper className={classes.root}>
          <CreateBrewingProcess className={classes.root} />
        </Paper>
      </div>
    );
  }
}

AllBrewingProcesses.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllBrewingProcesses);
