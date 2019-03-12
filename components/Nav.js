import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Link from 'next/link';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: 'space-between'
  }
});

class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classes.toolbarMain}>
        <Link href="/">
          <a>
            <Button size="small">Home</Button>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <Button size="small">About</Button>
          </a>
        </Link>
        <Link href="/dashboard">
          <a>
            <Button size="small">Admin Area</Button>
          </a>
        </Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Indebrau
        </Typography>
        <Button variant="outlined" size="small">
          Sign In
        </Button>
        <Button variant="outlined" size="small">
          Sign Up
        </Button>
      </Toolbar>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Nav);
