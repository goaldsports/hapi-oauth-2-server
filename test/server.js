// import { Server } from '@hapi/hapi'
// import * as HapiOAuth2Server from '../index.js'

const { Server } = require('@hapi/hapi')
const HapiOAuth2Server = require('../index.js')

exports.build = async model => {
  const server = Server({
    port: 3000,
    host: 'localhost'
  })

  server.register({
    plugin: HapiOAuth2Server,
    options: {
      model
    }
  })

  server.route({
    method: 'GET',
    path: '/authenticate',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server.plugins['hapi-oauth2-server-plugin']
        try {
          return await oauth.authenticate(req)
        } catch (e) {
          return h.response().code(401)
        }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/authorize',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server.plugins['hapi-oauth2-server-plugin']
        try {
          return await oauth.authorize(req)
        } catch (e) {
          return h.response().code(401)
        }
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/token',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server.plugins['hapi-oauth2-server-plugin']
        try {
          return await oauth.token(req)
        } catch (e) {
          console.log(e)
          return h.response().code(401)
        }
      }
    }
  })

  return server
}
