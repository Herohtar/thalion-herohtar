import React from 'react'
import { SiteData, Head } from 'react-static'
//
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
  },
})

export default withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <SiteData render={({title}) => (
        <Head title={title} />
    )} />
    <Typography variant="display1" paragraph>Welcome!</Typography>
    <Typography variant="body1">This site has nothing on it... yet.</Typography>
  </div>
))
