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
import { MashTunProps } from '../../lib/ComponentProperties';
import Loading from '../Loading';
import Error from '../Error';
import GraphChart from '../GraphChart';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    flexGrow: 1
  },
  graph: {
    width: '50%',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
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
    return (
      <>
      <Dialog
        open={this.state.infoOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{MashTunProps.title}</DialogTitle>
        <DialogContent>
          <main className={this.props.classes.layout}>
            <Paper>
              <Typography variant="body1" gutterBottom>
                {MashTunProps.description}
              </Typography>
            </Paper>
          </main>
        </DialogContent>
      </Dialog>

      <Dialog
        open={this.state.dataOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{MashTunProps.title}</DialogTitle>
        <DialogContent>
          <Query
            query={GRAPH_QUERY}
            variables={{
              id: 'cjua7nf000atu0753thz4m36g',
              dataPoints: 50
            }}
            pollInterval={10000}
          >
            {({ data, error, loading }) => {
              if (loading) return <Loading />;
              if (error) return <Error error={error} />;
              if (data) {
                const graph =
                  <GraphChart
                    data={data.graph.graphData}
                    key={data.graph.id}
                    name={data.graph.name}
                  />;
                return (

                  <Paper>
                    <Typography variant="h5">
                      Here is some Graph Chart of the Mash Tun
                    </Typography>
                    {graph}
                  </Paper>
                );
              }
            }}
          </Query>
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
    if (
      this.props.activeSteps.some(
        r =>
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
          r =>
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
              <Typography gutterBottom variant="h5">
                {MashTunProps.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleInfoClick}>
              More Info
            </Button>
            {this.state.active && (
              <Typography gutterBottom variant="body2">
                Mash In: {details.mashInTemperature}°C
                Water: {details.mashWaterLiter}L
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
