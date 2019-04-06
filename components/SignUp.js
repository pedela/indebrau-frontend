import { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Mutation } from 'react-apollo';
import Error from './Error';
import {
  CURRENT_USER_QUERY,
  SIGN_UP_MUTATION
} from '../lib/queriesAndMutations';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Mutation
        mutation={SIGN_UP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { loading, error }) => (
          <main className={classes.main}>
            <Error error={error} />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <ThumbUpIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>

              <form
                className={classes.form}
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await signup().catch(() => {});
                  this.setState({ name: '', email: '', password: '' });
                }}
              >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">User Name</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={this.state.name}
                    onChange={this.saveToState}
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}
                >
                  Sign in
                </Button>
              </form>
            </Paper>
          </main>
        )}
      </Mutation>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
