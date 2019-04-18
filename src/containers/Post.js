import React from 'react'
import { Head, useSiteData, useRouteData } from 'react-static'
//
import { Link } from 'components/Router'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'

const styles = theme => ({
  root: {
  },
})

export default withStyles(styles)(({ classes }) => {
  const { title } = useSiteData()
  const { post } = useRouteData()
  return (
    <div className={classes.root}>
      <Head title={`${post.title} - ${title}`} />
      <Button component={Link} to="/blog">← Back</Button>
      <Typography variant="h5">{post.title}</Typography>
      <Typography variant="subtitle1" paragraph><Moment date={post.date} format="dddd, MMMM Do, YYYY" /></Typography>
      <Typography variant="body2" color="textSecondary" component={ReactMarkdown} source={post.body} />
    </div>
  )
})
