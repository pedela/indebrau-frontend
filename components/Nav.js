import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import SignOut from './SignOut';
import User from './User';

const styles = theme => ({
  main: {
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
        <User>
          {({ data }) => {
            const me = data ? data.me : null;
            return(
              <Toolbar className={classes.toolbarMain}>
                <Link href="/">
                  <a className={classes.buttonLinks}>
                    <Button>Home</Button>
                  </a>
                </Link>
                <Link href="/about">
                  <a className={classes.buttonLinks}>
                    <Button>About</Button>
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
                {me && me.permissions.includes('ADMIN') &&
                  <Link href="/dashboard">
                    <a className={classes.buttonLinks}>
                      <Button>Admin Area</Button>
                    </a>
                  </Link>
                }
                {!me &&
                <Link href="/signin">
                  <a className={classes.buttonLinks}>
                    <Button>Sign In</Button>
                  </a>
                </Link>
                }
                {me &&
                <SignOut />
                }
                {!me &&
                  <Link href="/signup">
                    <a className={classes.buttonLinks}>
                      <Button>Sign Up</Button>
                    </a>
                  </Link>
                }
              </Toolbar>);
          }}
        </User>
      </main>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Nav);
