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
import { WortCopperProps } from '../../lib/ComponentProperties';

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

class WortCopper extends Component {
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
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {WortCopperProps.title}
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Typography variant="body1" gutterBottom>
              {WortCopperProps.description}
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
    if (
      this.props.activeSteps.some(
        r => ['BOILING', 'CHILLING', 'LAUTERING'].indexOf(r) >= 0
      )
    ) {
      this.state = { active: true };
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSteps !== prevProps.activeSteps) {
      if (
        this.props.activeSteps.some(
          r => ['BOILING', 'CHILLING', 'LAUTERING'].indexOf(r) >= 0
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
              image={WortCopperProps.imageUrl}
              title={WortCopperProps.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {WortCopperProps.title}
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

WortCopper.propTypes = {
  classes: PropTypes.object.isRequired,
  activeSteps: PropTypes.array.isRequired,
  graphs: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired
};

export default withStyles(styles)(WortCopper);
