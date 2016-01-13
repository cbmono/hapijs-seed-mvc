import config  from 'config'
import _  from 'lodash'
import { default as log } from '../../src/logger'

const rp = require('request-promise')


//
// Tests
//
describe(`API Test: ToDo Lists`, () => {
  /**
   * NOTE: follow this order of API Tests
   *
   * CREATE -> UPDATE -> VIEW (ALL) -> DELETE -> Done!
   */

  // Keep track of the created ID
  let createdId
    , createdData = { name: 'New ToDo List' }
    , updatedData = { name: 'Updated ToDo List name' }

  // Expected fields for ToDo Lists
  let expectedFields = [ 'id', 'name', 'created_at', 'updated_at' ]


  describe('POST /todo-lists', () => {
    it(`should create a new ToDo List`, (done) => {
      rp({
        method: 'POST',
        uri: config.apiUrl + '/todo-lists',
        resolveWithFullResponse: true,
        body: JSON.stringify(createdData)
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body.length).toBe(1)
          expect(body[0].id).toBeGreaterThan(0)
          expect(body[0].name).toBe(createdData.name)
          expect(body[0].created_at).toBe(body[0].updated_at)
          expect(_.keys(body[0])).toEqual(expectedFields)

          createdId = body[0].id
          done()
        },
        (err) => {
          console.error(err)
          fail()
        }
      )
    })

    it(`should return status code 400`, (done) => {
      rp({
        method: 'POST',
        uri: config.apiUrl + '/todo-lists'
      })
      .then(
        (response) => fail,
        (err) => {
          expect(err.statusCode).toBe(400)
          done()
        }
      )
    })
  })

  describe('PUT /todo-lists/{id}', () => {
    it(`should update an existing ToDo List`, (done) => {
      rp({
        method: 'PUT',
        uri: config.apiUrl + '/todo-lists/' + createdId,
        resolveWithFullResponse: true,
        body: JSON.stringify(updatedData)
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body.length).toBe(1)
          expect(body[0].id).toBe(createdId)
          expect(body[0].name).toBe(updatedData.name)
          expect(body[0].created_at).not.toBe(body[0].updated_at)
          expect(_.keys(body[0])).toEqual(expectedFields)

          done()
        },
        (err) => {
          console.error(err)
          fail()
        }
      )
    })

    it(`should return status code 400`, (done) => {
      rp({
        method: 'PUT',
        uri: config.apiUrl + '/todo-lists/' + createdId
      })
      .then(
        (response) => fail,
        (err) => {
          expect(err.statusCode).toBe(400)
          done()
        }
      )
    })

    it(`should return status code 404`, (done) => {
      rp({
        method: 'PUT',
        uri: config.apiUrl + '/todo-lists/-1',
        body: JSON.stringify(updatedData)
      })
      .then(
        (response) => fail,
        (err) => {
          expect(err.statusCode).toBe(404)
          done()
        }
      )
    })
  })

  describe('GET /todo-lists/{id}', () => {
    it(`should retrieve one ToDo List`, (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/todo-lists/' + createdId,
        resolveWithFullResponse: true
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body.length).toBe(1)
          expect(body[0].id).toBe(createdId)
          expect(body[0].name).toBe(updatedData.name)
          expect(_.keys(body[0])).toEqual(expectedFields)

          done()
        },
        (err) => {
          console.error(err)
          fail()
        }
      )
    })

    it(`should return status code 404`, (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/todo-lists/-1'
      })
      .then(
        (response) => fail,
        (err) => {
          expect(err.statusCode).toBe(404)
          done()
        }
      )
    })
  })

  describe('GET /todo-lists/{id}/todos', () => {
    it(`should retrieve one ToDo List and all its ToDo's`, (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/todo-lists/' + createdId + '/todos',
        resolveWithFullResponse: true
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body.length).toBe(1)
          expect(body[0].id).toBe(createdId)
          expect(_.isArray(body[0].todos)).toBe(true)

          done()
        },
        (err) => {
          console.error(err)
          fail()
        }
      )
    })

    it(`should return status code 404`, (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/todo-lists/-1/todos'
      })
      .then(
        (response) => fail,
        (err) => {
          expect(err.statusCode).toBe(404)
          done()
        }
      )
    })
  })

  describe('GET /todo-lists', () => {
    it(`should retrieve all ToDo Lists`, (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/todo-lists',
        resolveWithFullResponse: true
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)
          let createdEntry = _.findWhere(body, { id: createdId })

          expect(response.statusCode).toBe(200)
          expect(body.length).toBeGreaterThan(0)
          expect(createdEntry.id).toBe(createdId)
          expect(createdEntry.name).toBe(updatedData.name)
          expect(_.keys(createdEntry)).toEqual(expectedFields)

          done()
        },
        (err) => {
          console.error(err)
          fail()
        }
      )
    })
  })

  describe('DELETE /todo-lists/{id}', () => {
    it(`should delete one ToDo List`, (done) => {
      rp({
        method: 'DELETE',
        uri: config.apiUrl + '/todo-lists/' + createdId,
        resolveWithFullResponse: true
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body).toBe(1)

          done()
        },
        (err) => {
          console.error(err)
          fail()
        }
      )
    })

    it(`should return status code 404`, (done) => {
      rp({
        method: 'DELETE',
        uri: config.apiUrl + '/todo-lists/-1'
      })
      .then(
        (response) => fail,
        (err) => {
          expect(err.statusCode).toBe(404)
          done()
        }
      )
    })
  })
})
