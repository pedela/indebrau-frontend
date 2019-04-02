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
    open: false
  };

  // helper functions
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
      return 'Grain Mill';
    case 'MashTun':
      return 'Mash Tun';
    case 'SpargingVessel':
      return 'Sparging Vessel';
    case 'WortCopper':
      return 'Wort Copper Description';
    case 'ElectronicHydrometer':
      return 'Electronic Hydrometer Description';
    case 'Fermenter':
      return 'Fermenter Description';
    case 'WortChiller':
      return 'WortChiller';
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
      return 'WortChiller';
    case 'Keg':
      return 'Keg';
    case 'Bottle':
      return 'Bottle';
    }
  };

  handleCardActionClick = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, brewingProcessId, type } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.handleCardActionClick}>
          <CardMedia
            className={classes.media}
            image={this.getImage(type)}
            title={this.getTitle(type)}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {type}
            </Typography>
            <Typography component="p">{this.getDescription(type)}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {brewingProcessId && (
            <Button size="small" color="primary">
              Graph
            </Button>
          )}
          <Button size="small" color="primary">
            Details
          </Button>
        </CardActions>
      </Card>
    );
  }
}

BreweryComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  brewingProcessId: PropTypes.string,
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
