const {
  defineConfig
} = require('@vue/cli-service');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const paths = [{
    path: '/',
    lastmod: '2022-09-19',
    priority: 1.0,
  },
  {
    path: '/inscription',
    lastmod: '2022-09-19',
    priority: 1.0,
  },
  {
    path: '/accueil',
    lastmod: '2022-09-19',
    priority: 1.0,
  },
  {
    path: '/connexion',
    lastmod: '2022-09-19',
    priority: 1.0,
  },
  {
    path: '/liste-des-evenements',
    lastmod: '2022-09-19',
    priority: 1.0,
  },
  {
    path: '/liste-des-ventes',
    lastmod: '2022-09-19',
    priority: 1.0,
  },
  {
    path: '/presentation-des-membres-APE',
    lastmod: '2022-09-19',
    priority: 1.0,
  },
  {
    path: '/mentions-legales',
    lastmod: '2022-09-19',
    priority: 1.0,
  }
]

module.exports = defineConfig({
  transpileDependencies: true
})

// allows access to the sass variable
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/style/scss/variables.scss";
        `
      }
    }
  },
  configureWebpack: {
    plugins: [
      new SitemapPlugin({
        base: 'https://apecrosmieres.fr',
        paths
      })
    ]
  }
};