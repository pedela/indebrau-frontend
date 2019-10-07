import Typography from '@material-ui/core/Typography';
import {
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
  Grid,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  card: {
    width: 300
  },
  media: {
    height: 300
  }
}));

export default function Beers() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="../karnevalsKoelsch.jpg"
                    title="Karnevals Kölsch"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Karnevals Kölsch
                    </Typography>
                    <Typography component="p">Delicious!</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="../epa.jpg"
                    title="Eschweiler Pale Ale"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Eschweiler Pale Ale
                    </Typography>
                    <Typography component="p">Delicious!</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
