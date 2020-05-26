import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  Paper,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  withStyles
} from '@material-ui/core';
import { WortChillerProps } from '../../lib/ComponentProperties';

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

class WortChiller extends Component {
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
        <DialogTitle id='form-dialog-title'>
          {WortChillerProps.title}
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Typography variant='body1' gutterBottom>
              {WortChillerProps.description}
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
    if (this.props.activeSteps.includes('CHILLING')) {
      this.state.active = true;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSteps !== prevProps.activeSteps) {
      if (this.props.activeSteps.includes('CHILLING')) {
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
              image={WortChillerProps.imageUrl}
              title={WortChillerProps.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {WortChillerProps.title}
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

WortChiller.propTypes = {
  classes: PropTypes.object.isRequired,
  activeSteps: PropTypes.array.isRequired,
  graphs: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired
};

export default withStyles(styles)(WortChiller);
