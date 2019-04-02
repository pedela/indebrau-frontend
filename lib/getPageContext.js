import { SheetsRegistry } from 'jss';
import {
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700]
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700]
    }
  },
  typography: {
    useNextVariants: true
  },
  spacing: {
    unit: 8
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  // eslint-disable-next-line no-undef
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}
