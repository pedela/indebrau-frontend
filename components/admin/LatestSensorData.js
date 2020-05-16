import { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Paper, Typography,   Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,withStyles } from '@material-ui/core';
import {
  LATEST_SENSOR_DATA_QUERY
} from '../../lib/queriesAndMutations';
import { renderDate } from '../../lib/utils.js';
import Error from '../Error';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%'
  }
});

class LatestSensorValues extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="subtitle1" gutterBottom>
          Latest Sensor Values
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sensor Name</TableCell>
              <TableCell align="center">Time Stamp</TableCell>
              <TableCell align="center">Value</TableCell>
            </TableRow>
          </TableHead>
          <Query
            query={LATEST_SENSOR_DATA_QUERY}
            pollInterval={2000}
          >
            {({ data, error, loading }) => {
              if (loading) return <></>;
              if (error) return <Error error={error} />;
              if (data) {
                const sensorDataTable = data.latestSensorData.map(sensorData => (
                  <TableRow key={sensorData.sensorName}>
                    <TableCell align="center">{sensorData.sensorName.replace(/[/]/g, ' ')}</TableCell>
                    <TableCell align="center">{renderDate(sensorData.sensorTimeStamp)}</TableCell>
                    <TableCell align="center">{parseFloat(sensorData.sensorValue).toFixed(2)}</TableCell>
                  </TableRow>
                ));
                return (
                  <TableBody>{sensorDataTable}</TableBody>
                );
              }
            }}
          </Query>
        </Table>
      </Paper>
    );
  }
}

LatestSensorValues.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LatestSensorValues);
