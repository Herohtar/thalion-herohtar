import React from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'

import fs from 'fs'
import path from 'path'
import glob from 'glob'
import moment from 'moment'

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
      path: path.posix.join('/blog', name),
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

function generateCategoryRoutes(posts, categories, previousGroups = []) {
  const formats = [
    'YYYY',
    'MMMM YYYY',
    'MMMM Do, YYYY'
  ]
  if (categories.length > 0) {
    return Object.entries(groupPosts(posts, categories[0])).map(([group, groupedPosts]) => {
      const currentGroups = previousGroups.concat(group)
      const date = moment({year: currentGroups[0], month: (currentGroups[1] - 1) || 0, day: currentGroups[2] || 1})

      return {
        path: `/${group}`,
        component: 'src/pages/blog',
        getData: () => ({
          header: `Posts from ${date.format(formats[currentGroups.length - 1])}`,
          posts: groupedPosts,
        }),
        children: generateCategoryRoutes(groupedPosts, categories.slice(1), currentGroups),
      }
    })
  }

  return [];
}

export default {
  siteRoot: siteConfig.url,
  getSiteData: () => siteConfig,
  getRoutes: async () => {
    const posts = getPosts()
    return [
      {
        path: '/blog',
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
          ...generateCategoryRoutes(posts, ['year', 'month', 'day']),
        ],
      },
    ]
  },
  renderToElement: App => (
    <JssProvider registry={new SheetsRegistry()} generateClassName={createGenerateClassName()}>
      <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  ),
  renderToHtml: (render, app, { meta }) => {
    const html = render(app)

    meta.jssStyles = app.props.registry.toString()

    return html
  },
  Document: ({ Html, Head, Body, children, renderMeta }) => (
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
  ),
}
