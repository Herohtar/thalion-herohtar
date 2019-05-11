import createMuiTheme from '@material-ui/core/createMuiTheme'
import { blueGrey, deepOrange, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blueGrey,
    secondary: blueGrey,
    error: deepOrange,
    text: {
      footer: grey[400],
    },
  },
})

export default theme;
