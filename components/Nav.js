import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import SignOut from './SignOut';
import { CurrentUser } from './User';

const styles = theme => ({
  main: {
    width: 'auto',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1,
    [theme.breakpoints.down(700 + theme.spacing.unit * 2)]: {
      display: 'none'
    }
  },
  buttonLinks: {
    width: 'auto',
    textDecoration: 'none',
    size: 'small'
  }
});

class Nav extends Component {
  state = {
    signedIn: false
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CurrentUser>
          {({ data }) => {
            const me = data ? data.me : null;
            return (
              <Toolbar className={classes.toolbarMain}>
                <Link href="/">
                  <a className={classes.buttonLinks}>
                    <Button>Home</Button>
                  </a>
                </Link>
                <Link href="/beers">
                  <a className={classes.buttonLinks}>
                    <Button>Our Beers</Button>
                  </a>
                </Link>
                <Link href="/brewery">
                  <a className={classes.buttonLinks}>
                    <Button>The Brewery</Button>
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
                {me && me.permissions.includes('ADMIN') && (
                  <Link href="/dashboard">
                    <a className={classes.buttonLinks}>
                      <Button>Admin Area</Button>
                    </a>
                  </Link>
                )}

                <Link href="/user">
                  <a className={classes.buttonLinks}>
                    {!me && <Button>Sign In</Button>}
                    {me && <Button>{me.name}</Button>}
                  </a>
                </Link>

                {me && <SignOut />}
                {!me && (
                  <Link href="/signup">
                    <a className={classes.buttonLinks}>
                      <Button>Sign Up</Button>
                    </a>
                  </Link>
                )}
              </Toolbar>
            );
          }}
        </CurrentUser>
      </main>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Nav);
