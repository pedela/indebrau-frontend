import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  card: {
    maxWidth: 300
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
                    image="../static/karnevalsKoelsch.jpg"
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
                    image="../static/epa.jpg"
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
