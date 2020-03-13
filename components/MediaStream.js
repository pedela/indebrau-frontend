import { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles, Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import { LATEST_MEDIA_STREAM_FILE_QUERY } from '../lib/queriesAndMutations';
import Loading from './Loading';
import Error from './Error';
import { renderDate } from '../lib/utils.js';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%',
    textAlign: 'center'
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(1),
    width: 260
  }
});

class MediaStream extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Query
          query={LATEST_MEDIA_STREAM_FILE_QUERY}
          variables={{
            id: this.props.id
          }}
          pollInterval={this.props.updateFrequency * 1000}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              if (data.mediaStream.mediaFiles[0]) {
                return (
                  <>
                    <p>image to come here..</p>
                    <Typography body1="h5">
                        Last Updated:
                      {' ' + renderDate(data.mediaStream.mediaFiles[0].time)}
                    </Typography>
                  </>
                );
              } else {
                return <p>No Image</p>;
              }
            }
          }}
        </Query>
      </Paper>
    );
  }
}

MediaStream.propTypes = {
  id: PropTypes.string.isRequired,
  updateFrequency: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaStream);
