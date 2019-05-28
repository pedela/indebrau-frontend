import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Query } from 'react-apollo';
import {
  GRAPH_QUERY,
  LATEST_GRAPH_DATA_QUERY
} from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';
import GraphChart from '../GraphChart';
import Paper from '@material-ui/core/Paper';
import { BottleProps } from '../../lib/ComponentProperties';

const styles = theme => ({
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

/*
  TODO
  Convention: Since bottles / kegs could be distributed
  between several fridges, we check for all graphs here and
  display their temperature
*/
class Bottle extends Component {
  state = {
    infoOpen: false,
    dataOpen: false,
    active: false,
    id_fridge: null,
    id_freezer: null
  };

  handleDialogs = () => {
    return (
      <>
        <Dialog
          open={this.state.infoOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{BottleProps.title}</DialogTitle>
          <DialogContent>
            <Paper>
              <Typography variant="body1" gutterBottom>
                {BottleProps.description}
              </Typography>
            </Paper>
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={this.state.dataOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{BottleProps.title}</DialogTitle>
          <DialogContent>
            {this.state.id_fridge && (
              <Query
                query={GRAPH_QUERY}
                variables={{
                  id: this.state.id_fridge,
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
            {this.state.id_freezer && (
              <Query
                query={GRAPH_QUERY}
                variables={{
                  id: this.state.id_freezer,
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
    this.setState({ dataOpen: true });
  };

  constructor(props) {
    super(props);
    if (this.props.activeSteps.includes('BOTTLED')) {
      this.state.active = true;
    }
    this.props.graphs.map(graph => {
      if (graph.sensorName == 'fermentation/fridge/temperature') {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.id_fridge = graph.id;
      }
      if (graph.sensorName == 'fermentation/freezer/temperature') {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.id_freezer = graph.id;
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSteps !== prevProps.activeSteps) {
      if (this.props.activeSteps.includes('BOTTLED')) {
        this.setState({ active: true });
      } else {
        this.setState({ active: false });
      }
      if (this.props.graphs !== prevProps.graphs) {
        this.props.graphs.map(graph => {
          if (graph.sensorName == 'fermenting/fridge/temperature') {
            this.setState({ id_fridge: graph.id });
          }
          if (graph.sensorName == 'fermenting/freezer/temperature') {
            this.setState({ id_freezer: graph.id });
          }
        });
      }
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
              image={BottleProps.imageUrl}
              title={BottleProps.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {BottleProps.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleInfoClick}>
              More Info
            </Button>
            <Typography gutterBottom variant="body2">
              {this.state.id_fridge && (
                <Query
                  query={LATEST_GRAPH_DATA_QUERY}
                  variables={{
                    id: this.state.id_fridge
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
              {this.state.id_freezer && (
                <Query
                  query={LATEST_GRAPH_DATA_QUERY}
                  variables={{
                    id: this.state.id_freezer
                  }}
                  pollInterval={10000}
                >
                  {({ data, error, loading }) => {
                    if (loading) return <Loading />;
                    if (error) return <Error error={error} />;
                    if (data) {
                      return (
                        <>{data.graph.graphData[0].value.substring(0, 5)} °C</>
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

Bottle.propTypes = {
  classes: PropTypes.object.isRequired,
  activeSteps: PropTypes.array.isRequired,
  graphs: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired
};

export default withStyles(styles)(Bottle);
