const Joi = require('joi')
const OAuth2Server = require('@node-oauth/oauth2-server')
const { Request, Response } = require('@node-oauth/oauth2-server')

const fromHapiReq = req => {
  const { method, payload, ...other } = req
  return new Request({
    method: method.toUpperCase(),
    body: payload,
    ...other
  })
}

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    const schema = Joi.object().keys({
      model: Joi.object().required()
    })

    const { error } = schema.validate(options)
    if (error) {
      throw error
    }

    const oauthServer = new OAuth2Server(options)

    const oauth = {
      authenticate: async (req, options) => {
        const request = fromHapiReq(req)
        const response = new Response()
        return await oauthServer.authenticate(request, response, options)
      },
      authorize: async (req, options) => {
        const request = fromHapiReq(req)
        const response = new Response()
        return await oauthServer.authorize(request, response, options)
      },
      token: async (req, options) => {
        const request = fromHapiReq(req)
        const response = new Response()
        return await oauthServer.token(request, response, options)
      }
    }

    server.expose('oauth', oauth)
  }
}
