import React from 'react'
import { Head, useSiteData } from 'react-static'
//
import { Link } from 'components/Router'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
  },
  post: {
    background: '#5a5a5a',
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
}))

export default () => {
  const classes = useStyles()
  const { title } = useSiteData()
  return (
    <div className={classes.root}>
      <Head title={title} />
      <Typography variant="h4" paragraph>Welcome!</Typography>
      <Typography variant="body2" paragraph>This site has nothing on it... yet.</Typography>
      <Typography variant="body1">Check out the <Link to="/blog">blog</Link>.</Typography>
    </div>
  )
}
