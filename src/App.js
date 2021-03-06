import React from 'react'
import { Root, Routes, useSiteData } from 'react-static'
//
import { Link } from 'components/Router'
import { makeStyles } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    minHeight: '100vh',
  },
  header: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    padding: theme.spacing(4),
  },
  footer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
    color: theme.palette.text.link,
  },
}))

export default () => {
  const classes = useStyles()
  const { title } = useSiteData()
  return (
    <Root>
      <Grid container direction="column" justify="space-between" alignItems="center" className={classes.root}>
        <CssBaseline />
        <Grid item component="header" xs="auto" className={classes.header}>
          <Typography variant="h2" component={Link} to='/' className={classes.link}>{title}</Typography>
        </Grid>
        <Grid item container justify="center" component="main" className={classes.flexGrow}>
          <Grid item xs={12} sm={11} md={9} lg={6} className={classes.flexColumn}>
            <Paper className={[classes.content, classes.flexGrow].join(' ')}>
              <React.Suspense fallback={'Loading...'}>
                <Routes />
              </React.Suspense>
            </Paper>
          </Grid>
        </Grid>
        <Grid item className={classes.footer} component="footer" xs="auto">
          <Typography variant="caption" align="center" color="inherit">Powered by Firebase, React Static, GitHub, and Netlify CMS</Typography>
        </Grid>
      </Grid>
    </Root>
  )
}
