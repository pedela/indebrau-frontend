import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Error extends Component {
  state = {
    open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.handleOpen();
    }
  }

  render() {
    const { classes, error } = this.props;
    // no error
    if (!error || !error.message) return null;
    let errorMessage = 'Undefined Error!';
    if (error && error.message) {
      errorMessage = error.message;
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={
            <span id="message-id">
              {errorMessage.replace('GraphQL error: ', '')}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

Error.defaultProps = {
  error: {}
};

Error.propTypes = {
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Error);
