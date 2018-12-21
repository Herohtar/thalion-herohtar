import React from 'react'
import { SiteData, Head, RouteData } from 'react-static'
import { Link } from '@reach/router'
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
  <RouteData>
    {({post}) => (
      <div className={classes.root}>
        <SiteData>
          {({title}) => (
            <Head title={`${post.title} - ${title}`} />
          )}
        </SiteData>
        <Button component={Link} to="/blog">← Back</Button>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="subtitle1" paragraph><Moment date={post.date} format="dddd, MMMM Do, YYYY" /></Typography>
        <Typography variant="body2" color="textSecondary" component={ReactMarkdown} source={post.body} />
      </div>
    )}
  </RouteData>
))
