import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Card,
  Paper,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  withStyles
} from '@material-ui/core';
import { Query } from 'react-apollo';
import {
  GRAPH_QUERY,
  LATEST_GRAPH_DATA_QUERY
} from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';
import GraphChart from '../GraphChart';
import { ElectronicHydrometerProps } from '../../lib/ComponentProperties';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    flexGrow: 1
  },
  card: {
    width: 300
  },
  activeCard: {
    width: 300,
    backgroundColor: theme.palette.primary.light,
    animation: '3s fadeAnimation infinite'
  },
  '@keyframes fadeAnimation': {
    from: { opacity: 0.6 },
    to: { opacity: 1 }
  },
  media: {
    height: 300
  }
});

class ElectronicHydrometer extends Component {
  state = {
    infoOpen: false,
    dataOpen: false,
    active: false,
    id_tilt: null,
    id_temperature: null
  };

  handleDialogs = () => {
    return (
      <>
        <Dialog
          open={this.state.infoOpen}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            {ElectronicHydrometerProps.title}
          </DialogTitle>
          <DialogContent>
            <Paper>
              <Typography variant='body1' gutterBottom>
                {ElectronicHydrometerProps.description}
              </Typography>
            </Paper>
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth='lg'
          open={this.state.dataOpen}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            {ElectronicHydrometerProps.title}
          </DialogTitle>
          <DialogContent>
            {this.state.id_tilt && (
              <Query
                query={GRAPH_QUERY}
                variables={{
                  id: this.state.id_tilt,
                  dataPoints: 50
                }}
                pollInterval={10000}
              >
                {({ data, error, loading }) => {
                  if (loading) return <Loading />;
                  if (error) return <Error error={error} />;
                  if (data) {
                    return (
                      <GraphChart
                        data={data.graph.graphData}
                        key={data.graph.id}
                        name={data.graph.name}
                      />
                    );
                  }
                }}
              </Query>
            )}
            {this.state.id_temperature && (
              <Query
                query={GRAPH_QUERY}
                variables={{
                  id: this.state.id_temperature,
                  dataPoints: 50
                }}
                pollInterval={10000}
              >
                {({ data, error, loading }) => {
                  if (loading) return <Loading />;
                  if (error) return <Error error={error} />;
                  if (data) {
                    return (
                      <GraphChart
                        data={data.graph.graphData}
                        key={data.graph.id}
                        name={data.graph.name}
                      />
                    );
                  }
                }}
              </Query>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  handleClose = () => {
    this.setState({ dataOpen: false, infoOpen: false });
  };

  handleInfoClick = () => {
    this.setState({ infoOpen: true });
  };

  handleCardActionClick = () => {
    if (this.state.active) this.setState({ dataOpen: true });
  };

  constructor(props) {
    super(props);
    if (this.props.activeSteps.includes('FERMENTING')) {
      this.state.active = true;
    }
    this.props.graphs.map((graph) => {
      if (
        graph.sensorName == 'ispindel/iSpindel1/tilt' ||
        graph.sensorName == 'ispindel/iSpindel2/tilt'
      ) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.id_tilt = graph.id;
      }
      if (
        graph.sensorName == 'ispindel/iSpindel1/temperature' ||
        graph.sensorName == 'ispindel/iSpindel2/temperature'
      ) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.id_temperature = graph.id;
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSteps !== prevProps.activeSteps) {
      if (this.props.activeSteps.includes('FERMENTING')) {
        this.setState({ active: true });
      } else {
        this.setState({ active: false });
      }
    }
    if (this.props.graphs !== prevProps.graphs) {
      this.props.graphs.map((graph) => {
        if (
          graph.sensorName == 'ispindel/iSpindel1/tilt' ||
          graph.sensorName == 'ispindel/iSpindel2/tilt'
        ) {
          this.setState({ id_tilt: graph.id });
        }
        if (
          graph.sensorName == 'ispindel/iSpindel1/temperature' ||
          graph.sensorName == 'ispindel/iSpindel2/temperature'
        ) {
          this.setState({ id_temperature: graph.id });
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.handleDialogs()}
        <Card className={this.state.active ? classes.activeCard : classes.card}>
          <CardActionArea onClick={this.handleCardActionClick}>
            <CardMedia
              className={classes.media}
              image={ElectronicHydrometerProps.imageUrl}
              title={ElectronicHydrometerProps.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {ElectronicHydrometerProps.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' color='primary' onClick={this.handleInfoClick}>
              More Info
            </Button>
            <Typography gutterBottom variant='body2'>
              {this.state.id_temperature && (
                <Query
                  query={LATEST_GRAPH_DATA_QUERY}
                  variables={{
                    id: this.state.id_temperature
                  }}
                  pollInterval={10000}
                >
                  {({ data, error, loading }) => {
                    if (loading) return <Loading />;
                    if (error) return <Error error={error} />;
                    if (data) {
                      return (
                        <>{data.graph.graphData[0].value.substring(0, 5)}°C </>
                      );
                    }
                  }}
                </Query>
              )}
              {this.state.id_tilt && (
                <Query
                  query={LATEST_GRAPH_DATA_QUERY}
                  variables={{
                    id: this.state.id_tilt
                  }}
                  pollInterval={10000}
                >
                  {({ data, error, loading }) => {
                    if (loading) return <Loading />;
                    if (error) return <Error error={error} />;
                    if (data) {
                      return (
                        <>
                          {data.graph.graphData[0].value.substring(0, 5)} Tilt
                        </>
                      );
                    }
                  }}
                </Query>
              )}
            </Typography>
          </CardActions>
        </Card>
      </>
    );
  }
}

ElectronicHydrometer.propTypes = {
  classes: PropTypes.object.isRequired,
  activeSteps: PropTypes.array.isRequired,
  graphs: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired
};

export default withStyles(styles)(ElectronicHydrometer);
