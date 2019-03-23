import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './Error';
import BrewingProcessTable from './BrewingProcessTable';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  }
};

const BREWING_PROCESSES_QUERY = gql`
  query BREWING_PROCESSES_QUERY {
    brewingProcesses {
      id
      name
      start
      end
      active
    }
  }
`;

class BrewingProcesses extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={BREWING_PROCESSES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          // success!
          return (
            <Paper className={classes.root}>
              <BrewingProcessTable brewingProcesses={data.brewingProcesses} />
            </Paper>
          );
        }}
      </Query>
    );
  }
}

BrewingProcesses.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrewingProcesses);
