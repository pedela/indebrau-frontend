import { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles, Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import { LATEST_MEDIA_STREAM_FILE_QUERY } from '../lib/queriesAndMutations';
import Loading from './Loading';
import Error from './Error';
import { renderDate } from '../lib/utils.js';

const styles = (theme) => ({
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
    maxWidth: '65%',
    maxHeight: '50em'
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
                    <img
                      src={
                        // eslint-disable-next-line no-undef
                        process.env.BACKEND_ENDPOINT +
                        '/media/' +
                        this.props.brewingProcessId +
                        '/' +
                        this.props.id +
                        '/' +
                        data.mediaStream.mediaFiles[0].publicIdentifier
                      }
                      className={classes.image}
                    />
                    <img></img>
                    <Typography variant='subtitle1'>
                      {data.mediaStream.mediaFilesName}
                    </Typography>
                    <Typography variant='subtitle2'>
                      Last Update:
                      {' ' +
                        renderDate(data.mediaStream.mediaFiles[0].time, true)}
                    </Typography>
                  </>
                );
              } else {
                return <Typography variant='subtitle1'>No Image</Typography>;
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
  brewingProcessId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaStream);
