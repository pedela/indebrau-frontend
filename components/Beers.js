import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
});

class Beers extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={8}>
              {[0, 1, 2].map(value => (
                <Grid key={value} item>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="../static/drunken-deer.jpg"
                        title="The Drunken Deer"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Our Drunken Deer Beer
                        </Typography>
                        <Typography component="p">
                          Best beer in the world! Drink Drink Drink Drink! Drink
                          Drink Drink Drink! Drink Drink Drink Drink! Drink
                          Drink Drink Drink!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Beers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Beers);
