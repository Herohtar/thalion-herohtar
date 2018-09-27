import React from 'react'
import { SiteData, Head, RouteData, Link } from 'react-static'
//
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'

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

export default withStyles(styles)(({ classes, match }) => (
  <div className={classes.root}>
    <SiteData render={({title}) => (
        <Head title={title} />
    )} />
    <Grid container direction="column" spacing={16}>
      <RouteData render={({posts}) => (
        posts.map(post => (
          <Grid item xs="auto" key={post.path}>
            <Paper className={classes.post}>
              <Typography variant="headline" component={Link} to={post.path} className={classes.link}>{match}</Typography>
              <Typography variant="subheading" paragraph><Moment date={post.date} format="dddd, MMMM Do, YYYY" /></Typography>
              <Typography variant="body1" color="textSecondary" component={ReactMarkdown} source={post.body} paragraph />
            </Paper>
          </Grid>
        ))
      )} />
    </Grid>
  </div>
))
