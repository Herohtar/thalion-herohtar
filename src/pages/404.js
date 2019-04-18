import React from 'react'
import { Head, useSiteData } from 'react-static'
//
import Typography from '@material-ui/core/Typography'

export default function NotFound() {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(true)
  }, [])

  const { title } = useSiteData()

  return ready ? (
    <div>
      <Head title={`404 - Page Not Found - ${title}`} />
      <Typography variant="h3" align="center" paragraph>404</Typography>
      <Typography variant="h4" align="center">The page you requested could not be found.</Typography>
    </div>
  ) : null
}
