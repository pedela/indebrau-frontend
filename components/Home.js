import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
    maxHeight: '100%'
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Indebrau: Beer from Eschweiler
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          A beer as smooth as its river!
        </Typography>
        <img src="../static/brewery.jpeg" height="500" />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
