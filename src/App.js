import React from 'react'
import { SiteData, Router, Link } from 'react-static'
import Routes from 'react-static-routes'
//
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    minHeight: '100vh',
  },
  header: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  content: {
    padding: theme.spacing.unit * 4,
  },
  footer: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    color: theme.palette.text.footer,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexGrow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
})

class App extends React.PureComponent {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Router>
        <Grid container direction="column" justify="space-between" alignItems="center" className={classes.root}>
          <CssBaseline />
          <SiteData render={({title}) => (
            <Grid item component="header" xs="auto" className={classes.header}>
              <Typography variant="display3" component={Link} to='/' className={classes.link}>{title}</Typography>
            </Grid>
          )} />
          <Grid item container justify="center" component="main" className={classes.flexGrow}>
            <Grid item xs={12} sm={11} md={9} lg={6} className={classes.flexColumn}>
              <Paper className={[classes.content, classes.flexGrow].join(' ')}>
                <Routes />
              </Paper>
            </Grid>
          </Grid>
          <Grid item className={classes.footer} component="footer" xs="auto">
            <Typography variant="caption" align="center" color="inherit">Powered by Firebase, React Static, and Netlify CMS</Typography>
          </Grid>
        </Grid>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
