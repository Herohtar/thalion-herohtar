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
    const fileName = path.posix.basename(file, '.json')
    const [year, month, day, time, ...nameParts] = fileName.split('-')
    const name = nameParts.join('-')
    return {
      year,
      month,
      day,
      name,
      path: path.posix.join(routes.Blog.path, name),
      ...JSON.parse(fs.readFileSync(file))
    }
  }).reverse()
}

function groupPosts(posts, category) {
  return posts.reduce((accumulator, currentItem) => {
    accumulator[currentItem[category]] = accumulator[currentItem[category]] || []
    accumulator[currentItem[category]].push(currentItem)
    return accumulator
  }, {})
}

function generateCollectionRoutes(posts, groups) {
  if (groups.length > 0) {
    return Object.entries(groupPosts(posts, groups[0])).map(([grouping, groupedPosts]) => ({
      path: `/${grouping}`,
      component: routes.Blog.component,
      getData: () => ({
        posts: groupedPosts,
      }),
      children: generateCollectionRoutes(groupedPosts, groups.slice(1)),
    }))
  }
  
  return null;
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
        children: [
          ...posts.map(post => ({
            path: `/${post.name}`,
            component: 'src/containers/Post',
            getData: () => ({
              post,
            }),
          })),
          ...generateCollectionRoutes(posts, ['year', 'month', 'day']),
        ],
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
