import config  from 'config'
import { default as log } from '../../src/logger'

const rp = require('request-promise')


//
// Tests
//
describe(`API Test: Main`, () => {

  describe('GET /healthcheck', () => {
    it('should return the server status', (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/healthcheck',
        resolveWithFullResponse: true
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body.ping).toBe('pong')
          expect(body.timestamp).toBeGreaterThan(0)
          expect(body.database.healthy).toBe(true)
          expect(body.database.dbname).toBe(config.database.connection.database)
          done()
        },
        (err) => fail
      )
    })
  })

  describe('GET /{param*}', () => {
    it('should return index.html from ./public', (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/index.html',
        resolveWithFullResponse: true
      })
      .then(
        (response) => {
          expect(response.statusCode).toBe(200)
          done()
        },
        (err) => fail
      )
    })
  })
})
