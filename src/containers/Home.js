import React from 'react'
import { SiteData, Head, RouteData, Link } from 'react-static'
//
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
  },
  post: {
    background: '#5a5a5a',
    padding: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
  },
})

export default withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <SiteData render={({title}) => (
        <Head title={title} />
    )} />
    <Typography variant="h4" paragraph>Welcome!</Typography>
    <Typography variant="body2" paragraph>This site has nothing on it... yet.</Typography>
    <Typography variant="body1">Check out the <Link to="/blog">blog</Link>.</Typography>
  </div>
))
