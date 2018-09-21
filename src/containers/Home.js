import React from 'react'
import { SiteData, Head } from 'react-static'
//
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
})

export default withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <SiteData render={({title}) => (
        <Head title={title} />
    )} />
    <Typography variant="body1">Basic page with nothing on it... yet.</Typography>
  </div>
))
