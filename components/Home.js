import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    maxHeight: '100%'
  },
  image: {
    float: 'center',
    width: 300,
    maxHeight: '20'
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Indebrau
          <br />
          Beer from Eschweiler
        </Typography>
        <img src="../static/brewery.jpeg" className={classes.image} />
        <Typography variant="subtitle1" gutterBottom>
          A beer as smooth as its river!
        </Typography>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
