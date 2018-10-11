import { blueGrey, deepOrange, grey } from '@material-ui/core/colors';

export default {
  palette: {
    type: 'dark',
    primary: blueGrey,
    secondary: blueGrey,
    error: deepOrange,
    text: {
      footer: grey[400],
    },
  },
  typography: {
    useNextVariants: true,
  },
}
