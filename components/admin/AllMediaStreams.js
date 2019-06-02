import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import { ALL_MEDIA_STREAMS_QUERY } from '../../lib/queriesAndMutations';
import MediaStreamTable from './MediaStreamTable';
import MediaStream from '../MediaStream';
import Loading from '../Loading';
import Error from '../Error';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '1withStyles(styles)00%'
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(1),
    width: 270
  }
});

class AllMediaStreams extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Query query={ALL_MEDIA_STREAMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              const activeMediaStreams = data.mediaStreams.map(mediaStream => (
                <MediaStream
                  key={mediaStream.id}
                  id={mediaStream.id}
                  updateFrequency={mediaStream.updateFrequency}
                />
              ));
              return (
                <Paper className={classes.root}>
                  <Typography variant="h5">All Media Streams</Typography>
                  <MediaStreamTable mediaStreams={data.mediaStreams} />
                  <Typography variant="h5">Active Media Streams</Typography>
                  {activeMediaStreams}
                </Paper>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

AllMediaStreams.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllMediaStreams);
