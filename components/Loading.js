import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  main: {
    padding: theme.spacing(2)
  }
});

class Loading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Typography variant="overline" className={classes.root}>
        Loading...
      </Typography>
    );
  }
}
Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
