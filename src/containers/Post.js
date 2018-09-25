import React from 'react'
import { SiteData, Head, RouteData, Link } from 'react-static'
//
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'

const styles = theme => ({
  root: {
  },
})

export default withStyles(styles)(({ classes }) => (
  <RouteData render={({post}) => (
    <div className={classes.root}>
      <SiteData render={({title}) => (
          <Head title={`${post.title} - ${title}`} />
      )} />
      <Button component={Link} to="/">← Back</Button>
      <Typography variant="headline">{post.title}</Typography>
      <Typography variant="subheading" paragraph><Moment date={post.date} format="dddd, MMMM Do, YYYY" /></Typography>
      <Typography variant="body1" color="textSecondary" component={ReactMarkdown} source={post.body} />
    </div>
  )} />
))
