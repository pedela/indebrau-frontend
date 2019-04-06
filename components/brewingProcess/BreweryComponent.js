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

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    flexGrow: 1
  },
  card: {
    width: 300
  },
  media: {
    height: 300
  }
});

class BreweryComponent extends Component {
  state = {
    infoOpen: false,
    dataOpen: false
  };

  // helper functions, hold component details
  // brewing process details is passed as props
  //TODO: maybe put this into some db?
  getImage = type => {
    switch (type) {
    case 'GrainMill':
      return '../static/breweryImages/grainMill.png';
    case 'MashTun':
      return '../static/breweryImages/mashTun.png';
    case 'SpargingVessel':
      return '../static/breweryImages/spargingVessel.png';
    case 'WortCopper':
      return '../static/breweryImages/wortCopper.png';
    case 'ElectronicHydrometer':
      return '../static/breweryImages/electronicHydrometer.png';
    case 'Fermenter':
      return '../static/breweryImages/fermenter.png';
    case 'WortChiller':
      return '../static/breweryImages/wortChiller.png';
    case 'Keg':
      return '../static/breweryImages/keg.png';
    case 'Bottle':
      return '../static/breweryImages/bottle.png';
    }
  };
  getDescription = type => {
    switch (type) {
    case 'GrainMill':
      return 'Grain Mill Description';
    case 'MashTun':
      return 'Mash Tun Description';
    case 'SpargingVessel':
      return 'Sparging Vessel Description';
    case 'WortCopper':
      return 'Wort Copper Description';
    case 'ElectronicHydrometer':
      return 'Electronic Hydrometer Description';
    case 'Fermenter':
      return 'Fermenter Description';
    case 'WortChiller':
      return 'WortChiller Description';
    case 'Keg':
      return 'Keg Description';
    case 'Bottle':
      return 'Bottle Description';
    }
  };
  getTitle = type => {
    switch (type) {
    case 'GrainMill':
      return 'Grain Mill';
    case 'MashTun':
      return 'Mash Tun';
    case 'SpargingVessel':
      return 'Sparging Vessel';
    case 'WortCopper':
      return 'Wort Copper';
    case 'ElectronicHydrometer':
      return 'Electronic Hydrometer';
    case 'Fermenter':
      return 'Fermenter';
    case 'WortChiller':
      return 'Wort Chiller';
    case 'Keg':
      return 'Keg';
    case 'Bottle':
      return 'Bottle';
    }
  };
  getSpecificComponent = type => {
    switch (type) {
    case 'GrainMill':
      return '<GrainMill />';
    case 'MashTun':
      return 'Mash Tun';
    case 'SpargingVessel':
      return 'Sparging Vessel';
    case 'WortCopper':
      return 'Wort Copper';
    case 'ElectronicHydrometer':
      return 'Electronic Hydrometer';
    case 'Fermenter':
      return 'Fermenter';
    case 'WortChiller':
      return 'WortChiller';
    case 'Keg':
      return 'Keg';
    case 'Bottle':
      return 'Bottle';
    }
  };

  handleDialogs = () => {
    return (
      <Dialog
        open={this.state.infoOpen}
        onClose={this.handleInfoClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {this.getTitle(this.props.type)}
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Typography variant="body1" gutterBottom>
              {this.getDescription(this.props.type)}
            </Typography>
          </Paper>
        </DialogContent>
      </Dialog>
    );
  };

  handleInfoClick = () => {
    this.setState({ infoOpen: true });
  };

  handleInfoClose = () => {
    this.setState({ infoOpen: false });
  };

  handleCardActionClick = () => {
    if (!this.props.details) {
      this.setState({ infoOpen: true });
    } else {
      this.setState({ dataOpen: true });
    }
  };

  // some info on the rendering:
  // if card is active -> render "more info button"
  // if not -> render no buttons, CardMediaClick equals "more info button click"
  render() {
    const { classes, active, graphs, details, type } = this.props;
    return (
      <>
        {this.handleDialogs()}

        <Card className={classes.card}>
          <CardActionArea onClick={this.handleCardActionClick}>
            <CardMedia
              className={classes.media}
              image={this.getImage(type)}
              title={this.getTitle(type)}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.getTitle(type)}
              </Typography>
              <Typography component="p">{this.getDescription(type)}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {details && active && (
              <Button
                size="small"
                color="primary"
                onClick={this.handleCardActionClick}
              >
                Live
              </Button>
            )}
            {details && !active && (
              <Button
                size="small"
                color="primary"
                onClick={this.handleCardActionClick}
              >
                Review Data
              </Button>
            )}
            {details && (
              <Button
                size="small"
                color="primary"
                onClick={this.handleInfoClick}
              >
                More Info
              </Button>
            )}
          </CardActions>
        </Card>
      </>
    );
  }
}

BreweryComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  active: PropTypes.bool,
  graphs: PropTypes.array,
  details: PropTypes.object, // null -> no active process on
  type: PropTypes.oneOf([
    'GrainMill',
    'MashTun',
    'SpargingVessel',
    'WortCopper',
    'ElectronicHydrometer',
    'Fermenter',
    'WortChiller',
    'Keg',
    'Bottle'
  ]).isRequired
};

export default withStyles(styles)(BreweryComponent);
