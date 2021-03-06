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
  card: {
    width: 320
  },
  media: {
    height: 300
  },
  untappd: {
    width: 50,
    margin: theme.spacing(1)
  }
}));

export default function Beers() {
  const classes = useStyles();

  return (
    <Grid container spacing={1} justify='center'>
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
                    src='../untappd/logo.png'
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
                    src='../untappd/logo.png'
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
  );
}
