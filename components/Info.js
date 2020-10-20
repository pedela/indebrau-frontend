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
    width: 200
  }
});

class Info extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='h5' gutterBottom>
          About Indebrau
          <br />
        </Typography>
        <img src='../hopfiMalzi.png' className={classes.image} />
        <br />
        <br />
        <Typography variant='subtitle1' gutterBottom>
          info[at]indebrau.de
        </Typography>
      </div>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Info);
