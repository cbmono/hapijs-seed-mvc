//
// External dependencies
//
const _ = require('lodash')
const rp = require('request-promise')

//
// Internal dependencies
//
const config = require('config')

//
// Tests
//
describe(`API Test: ToDo's`, () => {
  /**
   * NOTE: follow this order of API Tests
   *
   * CREATE -> UPDATE -> VIEW (ALL) -> DELETE -> Done!
   */

  let todoListId
    , createdId
    , createdData = { name: 'New ToDo' }
    , updatedData = { name: 'Updated ToDo name' }

  // Expected fields for ToDo's
  let expectedFields = [ 'id', 'todo_list_id', 'name', 'created_at', 'updated_at' ]

  describe('POST /todo-lists', () => {
    it('should start by creating a new ToDo List', (done) => {
      rp({
        method: 'POST',
        uri: config.apiUrl + '/todo-lists',
        resolveWithFullResponse: true,
        body: JSON.stringify({ name: 'Temp ToDo List' })
      })
      .then((response) => {
        let body = JSON.parse(response.body)

        todoListId = body[0].id
        createdData.todo_list_id = todoListId

        done()
      })
      .catch((err) => {
        console.error(err)
        fail()
      })
    })
  })

  describe('POST /todos', () => {
    it(`should create a new ToDo`, (done) => {
      rp({
        method: 'POST',
        uri: config.apiUrl + '/todos',
        resolveWithFullResponse: true,
        body: JSON.stringify(createdData)
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body.length).toBe(1)
          expect(body[0].id).toBeGreaterThan(0)
          expect(body[0].todo_list_id).toBe(todoListId)
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
        uri: config.apiUrl + '/todos'
      }).then(
        (response) => fail,
        (err) => {
          expect(err.statusCode).toBe(400)
          done()
        }
      )
    })
  })

  describe('PUT /todos/{id}', () => {
    it(`should update an existing ToDo`, (done) => {
      rp({
        method: 'PUT',
        uri: config.apiUrl + '/todos/' + createdId,
        resolveWithFullResponse: true,
        body: JSON.stringify(updatedData)
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body.length).toBe(1)
          expect(body[0].id).toBe(createdId)
          expect(body[0].todo_list_id).toBe(todoListId)
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
        uri: config.apiUrl + '/todos/' + createdId
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
        uri: config.apiUrl + '/todos/-1',
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

  describe('GET /todos/{id}', () => {
    it(`should retrieve one ToDo`, (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/todos/' + createdId,
        resolveWithFullResponse: true
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(body.length).toBe(1)
          expect(body[0].id).toBe(createdId)
          expect(body[0].todo_list_id).toBe(todoListId)
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
        uri: config.apiUrl + '/todos/-1'
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

  describe('GET /todos', () => {
    it(`should retrieve all ToDo's`, (done) => {
      rp({
        method: 'GET',
        uri: config.apiUrl + '/todos',
        resolveWithFullResponse: true
      })
      .then(
        (response) => {
          let body = JSON.parse(response.body)
          let createdEntry = _.findWhere(body, { id: createdId })

          expect(response.statusCode).toBe(200)
          expect(body.length).toBeGreaterThan(0)
          expect(createdEntry.id).toBe(createdId)
          expect(createdEntry.todo_list_id).toBe(todoListId)
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

  describe('DELETE /todos/{id}', () => {
    it(`should delete one ToDo`, (done) => {
      rp({
        method: 'DELETE',
        uri: config.apiUrl + '/todos/' + createdId,
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
        uri: config.apiUrl + '/todos/-1'
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

  describe('DELETE /todo-lists/{id}', () => {
    it(`should end by deleting the created ToDo List`, (done) => {
      rp({
        method: 'DELETE',
        uri: config.apiUrl + '/todo-lists/' + todoListId
      })
      .then(done)
    })
  })
})
