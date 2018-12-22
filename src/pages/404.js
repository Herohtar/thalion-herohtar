import React from 'react'
import { SiteData, Head } from 'react-static'
//
import Typography from '@material-ui/core/Typography'

export default class extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    this.makeReady()
  }

  makeReady = () => {
    if (!this.state.ready) {
      this.setState(() => ({
        ready: true,
      }))
    }
  }

  render() {
    return this.state.ready ? (
      <div>
        <SiteData>
          {({title}) => (
            <Head title={`404 - Page Not Found - ${title}`} />
          )}
        </SiteData>
        <Typography variant="h3" align="center" paragraph>404</Typography>
        <Typography variant="h4" align="center">The page you requested could not be found.</Typography>
      </div>
    ) : null
  }
}
