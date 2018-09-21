import React from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
//
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
})

class App extends React.PureComponent {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Router>
        <div>
          <CssBaseline />
          <main>
            <Routes />
          </main>
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
