import React from 'react'
import { Head, useSiteData, useRouteData } from 'react-static'
//
import { Link } from 'components/Router'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Luxon from '../components/Luxon'
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles(theme => ({
  root: {
  },
}))

export default () => {
  const classes = useStyles()
  const { title } = useSiteData()
  const { post } = useRouteData()
  return (
    <div className={classes.root}>
      <Head title={`${post.title} - ${title}`} />
      <Button component={Link} to="/blog">← Back</Button>
      <Typography variant="h5">{post.title}</Typography>
      <Typography variant="subtitle1" paragraph><Luxon date={post.date} /></Typography>
      <Typography variant="body2" color="textSecondary" component={ReactMarkdown} source={post.body} />
    </div>
  )
}
