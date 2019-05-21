import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AllGraphs from './AllGraphs';
import AllBrewingProcesses from './AllBrewingProcesses';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Query } from 'react-apollo';
import { LATEST_MEDIA_STREAM_FILE_QUERY } from '../../lib/queriesAndMutations';
import Loading from '../Loading';
import Error from '../Error';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    maxHeight: '100%'
  }
});

class DashboardContent extends Component {
  returnActiveWindow = () => {
    if (this.props.activeWindow == 'AllGraphs') {
      return <AllGraphs />;
    }
    if (this.props.activeWindow == 'AllBrewingProcesses') {
      return <AllBrewingProcesses />;
    }
    return (
      <Paper className={this.props.classes.root}>
        <Typography variant="h5" gutterBottom>
          Admin Area
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          please choose your view
        </Typography>
        <CloudinaryContext cloudName="indebrau">
          <div>
            <Query
              query={LATEST_MEDIA_STREAM_FILE_QUERY}
              variables={{
                id: 'cjvo5ox5s0ofn0734el8hke0b' // currently hardcoded..
              }}
              pollInterval={1000}
            >
              {({ data, error, loading }) => {
                if (loading) return <Loading />;
                if (error) return <Error error={error} />;
                if (data) {
                  return (
                    <Image
                      publicId={data.mediaStream.mediaFiles[0].publicId}
                      width="500"
                      secure="true"
                    />
                  );
                }
              }}
            </Query>
          </div>
        </CloudinaryContext>
      </Paper>
    );
  };

  render() {
    return <Paper>{this.returnActiveWindow()}</Paper>;
  }
}

DashboardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  activeWindow: PropTypes.string.isRequired
};

export default withStyles(styles)(DashboardContent);
