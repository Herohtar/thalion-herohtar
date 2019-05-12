import React from 'react'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'

import theme from './src/theme'

export default () => ({
  beforeRenderToElement: (App, { meta }) => props => {
    meta.muiSheets = new ServerStyleSheets()

    return meta.muiSheets.collect(
      <ThemeProvider theme={theme}>
        <App {...props} />
      </ThemeProvider>
    )
  },
  headElements: (elements, { meta }) => [
    ...elements,
    meta.muiSheets.getStyleElement(),
  ],
})
