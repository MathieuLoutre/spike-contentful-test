const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')

const sugarss = require('sugarss')
const Contentful = require('spike-contentful')
const slug = require('slug')

let locals = {}

module.exports = {
  devtool: 'source-map',
  ignore: ['**/layout.html', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  plugins: [
    new Contentful({
      addDataTo: locals,
      accessToken: '66b315635d1412de84df0301fbd8b8405049f59c74698a8a3506883ff6c3da39',
      spaceId: 'e26te6k72s0h',
      contentTypes: [
        {
          name: 'podcasts',
          id: 'podcast',
          filters: {
            order: 'fields.number'
          },
          template: {
            path: 'views/_podcast.html',
            output: (podcast) => `podcasts/${podcast.fields.number}-${slug(podcast.fields.guestName)}.html`
          }
        },
        {
          name: 'notes',
          id: 'notes'
        }
      ]
    })
  ],
  reshape: htmlStandards({
    locals: (ctx) => Object.assign({ pageId: pageId(ctx) }, locals)
  }),
  postcss: cssStandards({
    parser: sugarss
  }),
  babel: jsStandards()
}
