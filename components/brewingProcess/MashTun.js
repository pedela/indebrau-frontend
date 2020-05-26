import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  withStyles
} from '@material-ui/core';
import { Query } from 'react-apollo';
import { GRAPH_QUERY } from '../../lib/queriesAndMutations';
import { MashTunProps } from '../../lib/ComponentProperties';
import Loading from '../Loading';
import Error from '../Error';
import GraphChart from '../GraphChart';

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

class MashTun extends Component {
  state = {
    infoOpen: false,
    dataOpen: false,
    active: false
  };

  handleDialogs = () => {
    let id;
    this.props.graphs.map((graph) => {
      if (graph.sensorName == 'mashing/mashTun/temperature') {
        id = graph.id;
      }
    });

    return (
      <>
        <Dialog
          open={this.state.infoOpen}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>{MashTunProps.title}</DialogTitle>
          <DialogContent>
            <main className={this.props.classes.layout}>
              <Paper>
                <Typography variant='body1' gutterBottom>
                  {MashTunProps.description}
                </Typography>
              </Paper>
            </main>
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth='lg'
          open={this.state.dataOpen}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>{MashTunProps.title}</DialogTitle>
          <DialogContent>
            {id && (
              <Query
                query={GRAPH_QUERY}
                variables={{
                  id: id,
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
    if (
      this.props.activeSteps.some(
        (r) =>
          ['HEATING_UP', 'MASH_IN', 'MASHING', 'LAUTERING', 'SPARGING'].indexOf(
            r
          ) >= 0
      )
    ) {
      this.state.active = true;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSteps !== prevProps.activeSteps) {
      if (
        this.props.activeSteps.some(
          (r) =>
            [
              'HEATING_UP',
              'MASH_IN',
              'MASHING',
              'LAUTERING',
              'SPARGING'
            ].indexOf(r) >= 0
        )
      ) {
        this.setState({ active: true });
      } else {
        this.setState({ active: false });
      }
    }
  }

  render() {
    const { classes, details } = this.props;
    return (
      <>
        {this.handleDialogs()}
        <Card className={this.state.active ? classes.activeCard : classes.card}>
          <CardActionArea onClick={this.handleCardActionClick}>
            <CardMedia
              className={classes.media}
              image={MashTunProps.imageUrl}
              title={MashTunProps.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5'>
                {MashTunProps.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' color='primary' onClick={this.handleInfoClick}>
              More Info
            </Button>
            {this.state.active && (
              <Typography gutterBottom variant='body2'>
                Mash In: {details.mashInTemperature}°C Water:{' '}
                {details.mashWaterLiter}L
              </Typography>
            )}
          </CardActions>
        </Card>
      </>
    );
  }
}

MashTun.propTypes = {
  classes: PropTypes.object.isRequired,
  activeSteps: PropTypes.array.isRequired,
  graphs: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired
};

export default withStyles(styles)(MashTun);
