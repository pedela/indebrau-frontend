import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Loading from './Loading';
import Error from './Error';
import GraphChart from './GraphChart';
import GraphTable from './GraphTable';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
    maxHeight: '100%'
  },
  fab: {
    margin: theme.spacing.unit
  }
});

const ACTIVE_GRAPH_QUERY = gql`
  query ACTIVE_GRAPH_QUERY($dataPoints: Int!) {
    activeGraphs(dataPoints: $dataPoints) {
      id
      name
      graphData(orderBy: time_ASC) {
        time
        value
      }
    }
  }
`;

class AllGraphs extends Component {
  render() {
    const { classes } = this.props;

    // hardcoded: names of all sensors
    const dataPoints = {
      dataPoints: 50
    };

    return (
      <>
        <Query
          query={ACTIVE_GRAPH_QUERY}
          variables={dataPoints}
          pollInterval={10000}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              const activeGraphs = data.activeGraphs.map(activeGraph => (
                <GraphChart
                  data={activeGraph.graphData}
                  key={activeGraph.id}
                  name={activeGraph.name}
                />
              ));
              return (
                <Paper className={classes.root}>
                  <Typography variant="h4" gutterBottom>
                    Currently Active Graphs
                  </Typography>
                  {activeGraphs}
                </Paper>
              );
            }
          }}
        </Query>
        <Paper className={classes.root}>
          <Typography variant="h4" className={classes.root}>
            All Graphs (ToDo)
          </Typography>
          <GraphTable graphs={[]} />
        </Paper>

        <Paper>
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Paper>
      </>
    );
  }
}

AllGraphs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllGraphs);
