import React from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'

import fs from 'fs'
import path from 'path'
import glob from 'glob'
import moment from 'moment'

import * as routes from './src/constants/routes'
import theme from './src/theme'

import siteConfig from './src/content/SiteConfig.json'

function getPosts() {
  return glob.sync('./src/content/blog/*.json').map(file => ({
    slug: path.basename(file, '.json'),
    ...JSON.parse(fs.readFileSync(file))
  })).reverse()
}

function groupByDay(posts) {
  return posts.reduce((a, c) => {
    const day = moment(c.date).date()
    a[day] = a[day] || []
    a[day].push(c)
    return a
  }, {})
}

function groupByMonth(posts) {
  return posts.reduce((a, c) => {
    const month = moment(c.date).month()
    a[month] = a[month] || []
    a[month].push(c)
    return a
  }, {})
}

function groupByYear(posts) {
  return posts.reduce((a, c) => {
    const year = moment(c.date).year()
    a[year] = a[year] || []
    a[year].push(c)
    return a
  }, {})
}

export default {
  siteRoot: siteConfig.url,
  getSiteData: () => siteConfig,
  getRoutes: async () => {
    const posts = getPosts()
    return [
      {
        path: routes.Home.path,
        component: routes.Home.component,
        getData: () => ({
          posts: posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.slug}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheetsRegistry = new SheetsRegistry()
    const muiTheme = createMuiTheme(theme)
    const generateClassName = createGenerateClassName()
    const html = render(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={muiTheme} sheetsManager={new Map()}>
          <Comp />
        </MuiThemeProvider>
      </JssProvider>
    )

    meta.jssStyles = sheetsRegistry.toString()

    return html
  },
  Document: class CustomHtml extends React.Component {
    render() {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
          </Head>
          <Body>
            {children}
            <style id="jss-server-side">{renderMeta.jssStyles}</style>
          </Body>
        </Html>
      )
    }
  },
}
