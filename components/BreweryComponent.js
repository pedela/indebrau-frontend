import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import * as properties from '../lib/ComponentProperties';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    flexGrow: 1
  },
  card: {
    width: 300,
  },
  media: {
    height: 300
  },
});

class BreweryComponent extends Component {
  state = {
    infoOpen: false
  };

  getProperties = type => {
    switch (type) {
    case 'GrainMill':
      return properties.GrainMillProps;
    case 'MashTun':
      return properties.MashTunProps;
    case 'SpargingVessel':
      return properties.SpargingVesselProps;
    case 'WortCopper':
      return properties.WortCopperProps;
    case 'ElectronicHydrometer':
      return properties.ElectronicHydrometerProps;
    case 'Fermenter':
      return properties.FermenterProps;
    case 'WortChiller':
      return properties.WortChillerProps;
    case 'Keg':
      return properties.KegProps;
    case 'Bottle':
      return properties.BottleProps;
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
          {this.getProperties(this.props.type).title}
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Typography variant="body1" gutterBottom>
              {this.getProperties(this.props.type).description}
            </Typography>
          </Paper>
        </DialogContent>
      </Dialog>
    );
  };

  handleInfoClose = () => {
    this.setState({ infoOpen: false });
  };

  handleCardActionClick = () => {
    this.setState({ infoOpen: true });
  };

  render() {
    const { classes, type } = this.props;
    return (
      <>
        {this.handleDialogs()}
        <Card className={classes.card}>
          <CardActionArea onClick={this.handleCardActionClick}>
            <CardMedia
              className={classes.media}
              image={this.getProperties(type).imageUrl}
              title={this.getProperties(type).title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.getProperties(type).title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
}

BreweryComponent.propTypes = {
  classes: PropTypes.object.isRequired,
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
