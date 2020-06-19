import Typography from '@material-ui/core/Typography';
import {
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
  Grid,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  card: {
    width: 320
  },
  media: {
    height: 300
  },
  untappd: {
    width: 50
  }
}));

export default function Beers() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={1}>
            <Grid item>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='../witbier.jpg'
                    title='Witbier'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Witbier{' '}
                      <a href='https://untappd.com/b/indebrau-witbier/3750739'>
                        <img
                          src='https://untappd.akamaized.net/social/ut_icon_144b.png'
                          className={classes.untappd}
                          align='right'
                        />
                      </a>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='../epa.jpg'
                    title='EPA - Eschweiler Pale Ale'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Eschweiler Pale Ale{' '}
                      <a href='https://untappd.com/b/indebrau-epa-eschweiler-pale-ale/3555273'>
                        <img
                          src='https://untappd.akamaized.net/social/ut_icon_144b.png'
                          className={classes.untappd}
                          align='right'
                        />
                      </a>
                    </Typography>
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
