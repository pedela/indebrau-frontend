import { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  CURRENT_USER_QUERY,
  SIGN_OUT_MUTATION
} from '../lib/queriesAndMutations';
import Button from '@material-ui/core/Button';

class Signout extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {signout => <Button onClick={signout}>Sign Out</Button>}
      </Mutation>
    );
  }
}
export default Signout;
