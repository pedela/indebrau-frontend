import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Paper,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  withStyles
} from '@material-ui/core';
import { KegProps } from '../../lib/ComponentProperties';

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

class Keg extends Component {
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
        <DialogTitle id='form-dialog-title'>{KegProps.title}</DialogTitle>
        <DialogContent>
          <Paper>
            <Typography variant='body1' gutterBottom>
              {KegProps.description}
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
    if (this.props.activeSteps.includes('CONDITIONING')) {
      this.state.active = true;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSteps !== prevProps.activeSteps) {
      if (this.props.activeSteps.includes('CONDITIONING')) {
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
              image={KegProps.imageUrl}
              title={KegProps.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {KegProps.title}
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

Keg.propTypes = {
  classes: PropTypes.object.isRequired,
  activeSteps: PropTypes.array.isRequired,
  graphs: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired
};

export default withStyles(styles)(Keg);
