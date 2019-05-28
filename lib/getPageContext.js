import { SheetsRegistry } from 'jss';
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import amber from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[100],
      main: indigo[500],
      dark: indigo[700]
    },
    secondary: {
      light: amber[300],
      main: amber[500],
      dark: amber[700]
    }
  },
  typography: {},
  spacing: 4
});

export { theme };
