import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from 'next/link';
import DashboardContent from './DashboardContent';
import Error from '../Error';
import { CurrentUser } from '../User';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  buttonLinks: {
    textDecoration: 'none'
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  }
});

class AdminDashboard extends Component {
  state = {
    open: false,
    activeWindow: 'none'
  };

  setActiveWindow = activeWindow => {
    this.setState({ activeWindow: activeWindow });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CurrentUser>
          {({ data }) => {
            const me = data ? data.me : null;
            // frontend check, only for display, real check is done in backend
            if (!me || !me.permissions.includes('ADMIN')) {
              return (
                <div className={classes.root}>
                  <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Error
                      error={{ message: 'You are no admin, please go back' }}
                    />
                    <Link href="/">
                      <a className={classes.buttonLinks}>
                        <ListItem button>
                          <ListItemIcon>
                            <HomeIcon />
                          </ListItemIcon>
                          <ListItemText primary="Home" />
                        </ListItem>
                      </a>
                    </Link>
                  </main>
                </div>
              );
            }
            return (
              <div className={classes.root}>
                <AppBar
                  position="absolute"
                  className={classNames(
                    classes.appBar,
                    this.state.open && classes.appBarShift
                  )}
                >
                  <Toolbar
                    disableGutters={!this.state.open}
                    className={classes.toolbar}
                  >
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerOpen}
                      className={classNames(
                        classes.menuButton,
                        this.state.open && classes.menuButtonHidden
                      )}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      className={classes.title}
                    >
                      Indebrau - Admin Area
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Drawer
                  variant="permanent"
                  classes={{
                    paper: classNames(
                      classes.drawerPaper,
                      !this.state.open && classes.drawerPaperClose
                    )
                  }}
                  open={this.state.open}
                >
                  <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    <Link href="/">
                      <a className={classes.buttonLinks}>
                        <ListItem button>
                          <ListItemIcon>
                            <HomeIcon />
                          </ListItemIcon>
                          <ListItemText primary="Home" />
                        </ListItem>
                      </a>
                    </Link>
                    <ListItem
                      button
                      onClick={() =>
                        this.setActiveWindow('AllBrewingProcesses')
                      }
                    >
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary="Brewing Processes" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => this.setActiveWindow('AllGraphs')}
                    >
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary="Media Streams" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => this.setActiveWindow('AllMediaStreams')}
                    >
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary="Graphs" />
                    </ListItem>
                  </List>
                </Drawer>
                <main className={classes.content}>
                  <div className={classes.appBarSpacer} />
                  <DashboardContent activeWindow={this.state.activeWindow} />
                </main>
              </div>
            );
          }}
        </CurrentUser>
      </main>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminDashboard);
