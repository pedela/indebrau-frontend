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

const styles = () => ({
  root: {
    flexGrow: 1
  },
  card: {
    width: 400,
    margin: 'auto'
  },
  media: {
    height: 500
  }
});

class Brewery extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={8}
            >
              <Grid item>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="../static/mashTun.png"
                      title="The Mash Tun"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Mash Tun
                      </Typography>
                      <Typography component="p">
                        Here are the details...
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
                      image="../static/grainMill.png"
                      title="The Grain Mill"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        The Grain Mill
                      </Typography>
                      <Typography component="p">
                        Here are the details...
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
                      image="../static/fermenter.png"
                      title="The Fermenter"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Fermenter
                      </Typography>
                      <Typography component="p">
                        Here are the details...
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
                      image="../static/spargingVessel.png"
                      title="Sparging Vessel"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Sparging Vessel
                      </Typography>
                      <Typography component="p">
                        Here are the details...
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
                      image="../static/cooler.png"
                      title="A Plate Cooler"
                      height="14000"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        A Plate Cooler
                      </Typography>
                      <Typography component="p">
                        Here are the details...
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
