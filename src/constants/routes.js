export const Home = {
  path: '/',
  exact: true,
  label: 'Home',
  component: 'src/containers/Home',
  condition: () => true,
}
export const Blog = {
  path: '/blog',
  exact: false,
  label: 'Blog',
  component: 'src/containers/Home',
  condition: () => true,
}
