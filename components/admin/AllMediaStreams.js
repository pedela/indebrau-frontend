import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Query } from 'react-apollo';
import {
  ALL_MEDIA_STREAMS_QUERY,
  LATEST_MEDIA_STREAM_FILE_QUERY
} from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(1),
    maxHeight: '100%'
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(1),
    width: 270
  }
});

class AllGraphs extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Query query={ALL_MEDIA_STREAMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            if (data) {
              return (
                <CloudinaryContext cloudName="indebrau">
                  <Paper>
                    <Query
                      query={LATEST_MEDIA_STREAM_FILE_QUERY}
                      variables={{
                        id: data.mediaStreams[0].id
                      }}
                      pollInterval={1000}
                    >
                      {({ data, error, loading }) => {
                        if (loading) return <Loading />;
                        if (error) return <Error error={error} />;
                        if (data) {
                          if (data.mediaStream.mediaFiles[0]) {
                            return (
                              <Image
                                publicId={
                                  data.mediaStream.mediaFiles[0].publicId
                                }
                                secure="true"
                                className={this.props.classes.image}
                              />
                            );
                          } else {
                            return <p>No Image</p>;
                          }
                        }
                      }}
                    </Query>
                  </Paper>
                </CloudinaryContext>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

AllGraphs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllGraphs);
