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
import Paper from '@material-ui/core/Paper';
import { Query } from 'react-apollo';
import { GRAPH_QUERY } from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';
import GraphChart from '../GraphChart';
import { ElectronicHydrometerProps } from '../../lib/ComponentProperties';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
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
    active: false
  };

  handleDialogs = () => {
    let id_tilt;
    let id_temperature;
    this.props.graphs.map(graph => {
      if (
        graph.sensorName == 'ispindel/iSpindel1/tilt' ||
        graph.sensorName == 'ispindel/iSpindel2/tilt'
      ) {
        id_tilt = graph.id;
      }
      if (
        graph.sensorName == 'ispindel/iSpindel1/temperature' ||
        graph.sensorName == 'ispindel/iSpindel2/temperature'
      ) {
        id_temperature = graph.id;
      }
    });
    return (
      <>
        <Dialog
          open={this.state.infoOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {ElectronicHydrometerProps.title}
          </DialogTitle>
          <DialogContent>
            <Paper>
              <Typography variant="body1" gutterBottom>
                {ElectronicHydrometerProps.description}
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
          <DialogTitle id="form-dialog-title">
            {ElectronicHydrometerProps.title}
          </DialogTitle>
          <DialogContent>
            {id_tilt && (
              <Query
                query={GRAPH_QUERY}
                variables={{
                  id: id_tilt,
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
            {id_temperature && (
              <Query
                query={GRAPH_QUERY}
                variables={{
                  id: id_temperature,
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSteps !== prevProps.activeSteps) {
      if (this.props.activeSteps.includes('FERMENTING')) {
        this.setState({ active: true });
      } else {
        this.setState({ active: false });
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
              image={ElectronicHydrometerProps.imageUrl}
              title={ElectronicHydrometerProps.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {ElectronicHydrometerProps.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleInfoClick}>
              More Info
            </Button>
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
