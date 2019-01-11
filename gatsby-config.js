module.exports = {
  siteMetadata: {
    title: "Jayme Woogerd",
    author: "Jayme Woogerd",
    description: "A simple personal website"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'jayme-woogerd',
        short_name: 'jwoogerd',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
  ],
}
