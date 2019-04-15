import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ALL_GRAPHS_QUERY, ACTIVE_GRAPHS_QUERY } from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';
import GraphChart from '../GraphChart';
import GraphTable from './GraphTable';
import CreateGraph from './CreateGraph';

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

class AllGraphs extends Component {
  render() {
    const { classes } = this.props;

    const activeGraphsVariables = {
      dataPoints: 50,
      active: true
    };

    return (
      <div className={classes.root}>
        <Query
          query={ACTIVE_GRAPHS_QUERY}
          variables={activeGraphsVariables}
          pollInterval={10000}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              const activeGraphs = data.graphs.map(activeGraph => (
                <GraphChart
                  data={activeGraph.graphData}
                  key={activeGraph.id}
                  name={activeGraph.name}
                />
              ));
              return (
                <Paper className={classes.root}>
                  <Typography variant="h5">Active Graphs</Typography>
                  {activeGraphs}
                </Paper>
              );
            }
          }}
        </Query>
        <Query query={ALL_GRAPHS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              return (
                <Paper className={classes.root}>
                  <Typography variant="h5">All Graphs</Typography>
                  <GraphTable graphs={data.graphs} />
                </Paper>
              );
            }
          }}
        </Query>
        <Paper className={classes.root}>
          <CreateGraph className={classes.root} />
        </Paper>
      </div>
    );
  }
}

AllGraphs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllGraphs);
