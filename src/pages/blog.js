import React from 'react'
import { Head, useSiteData, useRouteData } from 'react-static'
//
import { Link } from 'components/Router'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles(theme => ({
  root: {
  },
  post: {
    background: '#5a5a5a',
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.link,
  },
}))

export default () => {
  const classes = useStyles()
  const { title } = useSiteData()
  const { header, posts } = useRouteData()
  return (
    <div className={classes.root}>
      <Head title={`${header || 'Blog'} - ${title}`} />
      <Typography variant="h4" paragraph>{header || 'All Posts'}</Typography>
      <Grid container direction="column" spacing={2}>
        {posts.map(post => (
          <Grid item xs="auto" key={post.path}>
            <Paper className={classes.post}>
              <Typography variant="h5" component={Link} to={post.path} className={classes.link}>{post.title}</Typography>
              <Typography variant="subtitle1" paragraph><Moment date={post.date} format="dddd, MMMM Do, YYYY" /></Typography>
              <Typography variant="body2" color="textSecondary" component={ReactMarkdown} source={post.body} paragraph />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
