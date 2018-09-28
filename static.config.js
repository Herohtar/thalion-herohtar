import React from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'

import fs from 'fs'
import path from 'path'
import glob from 'glob'

import * as routes from './src/constants/routes'
import theme from './src/theme'

import siteConfig from './src/content/SiteConfig.json'

function getPosts() {
  return glob.sync('./src/content/blog/*.json').map(file => {
    const fileName = path.basename(file, '.json')
    const [year, month, day, ...nameParts] = fileName.split('-')
    const name = nameParts.join('-')
    return {
      year,
      month,
      day,
      name,
      path: path.join(routes.Blog.path, year, month, day, name),
      ...JSON.parse(fs.readFileSync(file))
    }
  }).reverse()
}

function groupPosts(posts, category) {
  return JSON.parse(JSON.stringify(posts)).reduce((a, c) => {
    let element
    switch (category) {
      case 'year':
        element = c.year
        break
        case 'month':
        element = c.month
        break
        case 'day':
        element = c.day
        break
    }
    a[element] = a[element] || []
    a[element].push(c)
    return a
  }, {})
}

function generateChildRoutes(groups, posts) {
  if (groups.length === 0) {
    return posts.map(post => ({
      path: `/${post.name}`,
      component: 'src/containers/Post',
      getData: () => ({
        post,
      }),
    }))
  }

  return Object.entries(groupPosts(posts, groups.shift())).map(([category, groupedPosts]) => ({
    path: `/${category}`,
    component: routes.Blog.component,
    getData: () => ({
      posts: groupedPosts,
    }),
    children: generateChildRoutes(groups, groupedPosts),
  }))
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
      },
      {
        path: routes.Blog.path,
        component: routes.Blog.component,
        getData: () => ({
          posts,
        }),
        children: generateChildRoutes(['year', 'month', 'day'], posts),
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
