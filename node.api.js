import React from 'react'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'

import theme from './src/theme'

export default () => ({
  beforeRenderToElement: (App, { meta }) => props => {
    meta.sheetsRegistry = new ServerStyleSheets()

    return meta.sheetsRegistry.collect(
      <ThemeProvider theme={theme}>
        <App {...props} />
      </ThemeProvider>
    )
  },
  headElements: (elements, { meta }) => [
    ...elements,
    <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: meta.sheetsRegistry.toString() }} />,
  ],
})
