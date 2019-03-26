import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import BrewingProcessTable from './BrewingProcessTable';
import SignIn from './SignIn';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
    maxHeight: '100%'
  }
});

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      participatingBrewingProcesses {
        id
        name
        start
        end
        description
      }
    }
  }
`;

const CurrentUser = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired
};

class User extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CurrentUser>
          {({ data }) => {
            const me = data ? data.me : null;
            return (
              <>
                {!me && <SignIn />}
                {me && (
                  <>
                    <Paper className={classes.root}>
                      <Typography variant="h4" gutterBottom>
                        Hello {me.name}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Your Brewing Processes
                      </Typography>
                      <Paper className={classes.root}>
                        <BrewingProcessTable
                          brewingProcesses={data.me.participatingBrewingProcesses}
                          adminView={false}
                        />
                      </Paper>
                    </Paper>
                    {me && me.permissions.includes('ADMIN') && (
                      <Link href="/dashboard">
                        <a className={classes.buttonLinks}>
                          <Button>Admin Area</Button>
                        </a>
                      </Link>
                    )}
                  </>
                )}
              </>
            );
          }}
        </CurrentUser>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(User);
export { CURRENT_USER_QUERY, CurrentUser };
