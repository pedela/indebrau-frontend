import { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    maxHeight: '100%'
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 270
  },
  untappd: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 150
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='h5' gutterBottom>
          Indebrau
          <br />
          Beer from Eschweiler
        </Typography>
        <img src='../logo.png' className={classes.image} />
        <Typography variant='subtitle1' gutterBottom>
          A beer as smooth as its river!
        </Typography>
        <br />
        <a href='https://untappd.com/Indebrau?ref=followbtn'>
          <img
            src='https://untappd.akamaized.net/social/ut_follow_lg.png'
            className={classes.untappd}
          />
        </a>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
