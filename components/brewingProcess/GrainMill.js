import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  withStyles
} from '@material-ui/core';
import { GrainMillProps } from '../../lib/ComponentProperties';

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

class GrainMill extends Component {
  state = {
    infoOpen: false,
    dataOpen: false,
    active: false
  };

  handleDialogs = () => {
    return (
      <Dialog
        open={this.state.infoOpen}
        onClose={this.handleInfoClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>{GrainMillProps.title}</DialogTitle>
        <DialogContent>
          <Paper>
            <Typography variant='body1' gutterBottom>
              {GrainMillProps.description}
            </Typography>
          </Paper>
        </DialogContent>
      </Dialog>
    );
  };

  handleInfoClose = () => {
    this.setState({ infoOpen: false });
  };

  handleInfoClick = () => {
    this.setState({ infoOpen: true });
  };

  handleCardActionClick = () => {
    this.setState({ dataOpen: true });
  };

  constructor(props) {
    super(props);
    if (this.props.activeSteps.includes('MALT_CRUSHING')) {
      this.state.active = true;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSteps !== prevProps.activeSteps) {
      if (this.props.activeSteps.includes('MALT_CRUSHING')) {
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
              image={GrainMillProps.imageUrl}
              title={GrainMillProps.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {GrainMillProps.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' color='primary' onClick={this.handleInfoClick}>
              More Info
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

GrainMill.propTypes = {
  classes: PropTypes.object.isRequired,
  activeSteps: PropTypes.array.isRequired,
  graphs: PropTypes.array.isRequired
};

export default withStyles(styles)(GrainMill);
