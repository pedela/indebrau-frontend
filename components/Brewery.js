import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    flexGrow: 1
  },
  card: {
    maxWidth: 300
  },
  media: {
    height: 300,
    image: { objectFit: 'cover' }
  }
});

class Brewery extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          className={classes.container}
          spacing={8}
          justify="center"
        >
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/grainMill.png"
                  title="Grain Mill"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Grain Mill
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/mashTun.png"
                  title="Mash Tun"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Mash Tun
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/spargingVessel.png"
                  title="Sparging Vessel"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Sparging Vessel
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/wortCopper.png"
                  title="Wort Copper"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Wort Copper
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/cooler.png"
                  title="Wort Chiller"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Wort Chiller
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/fermenter.png"
                  title="Fermenter"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Fermenter
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/electronicHydrometer.png"
                  title="Electronic Hydrometer"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Electronic Hydrometer
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/keg.png"
                  title="Keg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Keg
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="../static/breweryImages/bottle.png"
                  title="Beer Bottle"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    ..And Finally Beer
                  </Typography>
                  <Typography component="p">
                    Best beer in the world! Drink Drink Drink Drink! Drink Drink
                    Drink Drink! Drink Drink Drink Drink! Drink Drink Drink
                    Drink!
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
        </Grid>
      </div>
    );
  }
}

Brewery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Brewery);
