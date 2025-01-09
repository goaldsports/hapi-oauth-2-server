const { expect } = require('@hapi/code')
const Lab = require('@hapi/lab')
const { model } = require('./model')
const { build } = require('./server')

const { describe, before, it } = exports.lab = Lab.script()

describe('Hapi oauth2 server', () => {
  let server
  let res

  before(async () => {
    server = await build(model)
  })

  it('should fail for no authentication provided', async () => {
    res = await server.inject({
      method: 'GET',
      url: '/authenticate'
    })
    expect(res.statusCode, 'Wrong HTTP response status code').to.equal(401)
  })

  it('should authenticate', async () => {
    res = await server.inject({
      method: 'GET',
      url: '/authenticate',
      headers: {Authorization: 'Bearer foobar'}
    })
    expect(res.statusCode, 'Wrong HTTP response status code').to.equal(200)
  })

  it('should authorize', async () => {
    res = await server.inject({
      method: 'GET',
      url: '/authorize?client_id=test&client_secret=test&state=test&response_type=code',
      headers: {Authorization: 'Bearer foobar'},
    })
    expect(res.statusCode, 'Wrong HTTP response status code').to.equal(200)
  })

  it('should get token', async () => {
    res = await server.inject({
      method: 'POST',
      url: '/token',
      headers: {
        Authorization: 'Bearer foobar',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      payload: 'client_id=test&client_secret=test&grant_type=authorization_code&code=test'
    })
    expect(res.statusCode, 'Wrong HTTP response status code').to.equal(200)
  })
})
