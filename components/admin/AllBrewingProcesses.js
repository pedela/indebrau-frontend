import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Paper, Typography, withStyles } from '@material-ui/core';
import { ALL_BREWING_PROCESSES_QUERY } from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';
import BrewingProcessTable from '../BrewingProcessTable';
import CreateBrewingProcess from './CreateBrewingProcess';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%'
  },
  fab: {
    margin: theme.spacing(1)
  }
});

class AllBrewingProcesses extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Query query={ALL_BREWING_PROCESSES_QUERY}>
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
