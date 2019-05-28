import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  main: {
    padding: theme.spacing(2)
  }
});

class Loading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Typography component="h1" variant="h5" className={classes.root}>
        Loading...
      </Typography>
    );
  }
}
Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
