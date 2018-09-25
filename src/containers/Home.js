import React from 'react'
import { SiteData, Head, RouteData } from 'react-static'
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
})

export default withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <SiteData render={({title}) => (
        <Head title={title} />
    )} />
    <Typography variant="display1" paragraph>Welcome!</Typography>
    <Typography variant="body1" paragraph>This site has nothing on it... yet.</Typography>
    <Grid container direction="column" spacing={16} justify="space-between">
      <RouteData render={({posts}) => (
        posts.map(post => (
          <Grid item xs="auto" key={post.slug}>
            <Paper className={classes.post}>
              <Typography variant="headline">{post.title}</Typography>
              <Typography variant="subheading" paragraph><Moment date={post.date} format="dddd, MMMM Do, YYYY" /></Typography>
              <Typography variant="body1" color="textSecondary" component={ReactMarkdown} source={post.body} paragraph />
            </Paper>
          </Grid>
        ))
      )} />
    </Grid>
  </div>
))
