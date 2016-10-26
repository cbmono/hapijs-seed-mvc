import _ from 'lodash';
import config from 'config';
import fetch from 'node-fetch' ;
import testUtil from '../testUtility';

//
// Tests
//
describe('API Test: ToDo Lists', () => {
  /**
   * NOTE: follow this order for API Tests
   *
   * CREATE -> UPDATE -> VIEW -> VIEW ALL -> DELETE -> Done!
   */

  // Keep track of the created ID
  let createdId;

  const createdData = { name : 'New ToDo List' };
  const updatedData = { name : 'Updated ToDo List name' };

  // Expected fields for ToDo Lists
  const expectedFields = ['id', 'name', 'created_at', 'updated_at'];

  describe('POST /todo-lists', () => {
    it('should create a new ToDo List', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists`, {
          method: 'POST',
          body: JSON.stringify(createdData)
        });

        const body = await response.json();

        expect(response.ok).toBe(true);
        expect(body.length).toBe(1);
        expect(body[0].id).toBeGreaterThan(0);
        expect(body[0].name).toBe(createdData.name);
        expect(body[0].created_at).toBe(body[0].updated_at);
        expect(_.keys(body[0])).toEqual(expectedFields);

        createdId = body[0].id;
      }, done);
    });

    it('should return status code 400', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists`, {
          method: 'POST'
        });

        expect(response.ok).toBe(false);
      }, done);
    });
  });

  describe('PUT /todo-lists/{id}', () => {
    it('should update an existing ToDo List', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/${createdId}`, {
          method: 'PUT',
          body: JSON.stringify(updatedData)
        });

        const body = await response.json();

        expect(response.ok).toBe(true);
        expect(body.length).toBe(1);
        expect(body[0].id).toBe(createdId);
        expect(body[0].name).toBe(updatedData.name);
        expect(body[0].created_at).not.toBe(body[0].updated_at);
        expect(_.keys(body[0])).toEqual(expectedFields);
      }, done);
    });

    it('should return status code 400', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/${createdId}`, {
          method: 'PUT'
        });

        expect(response.status).toBe(400);
      }, done);
    });

    it('should return status code 404', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/-1`, {
          method: 'PUT',
          body: JSON.stringify(updatedData)
        });

        expect(response.status).toBe(404);
      }, done);
    });
  });

  describe('GET /todo-lists/{id}', () => {
    it('should retrieve one ToDo List', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/${createdId}`, {
          method: 'GET',
          body: JSON.stringify(updatedData)
        });

        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.length).toBe(1);
        expect(body[0].id).toBe(createdId);
        expect(body[0].name).toBe(updatedData.name);
        expect(_.keys(body[0])).toEqual(expectedFields);
      }, done);
    });

    it('should return status code 404', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/-1`, {
          method: 'GET'
        });

        expect(response.status).toBe(404);
      }, done);
    });
  });

  describe('GET /todo-lists/{id}/todos', () => {
    it('should retrieve one ToDo List and all its ToDo\'s', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/${createdId}/todos`, {
          method: 'GET'
        });

        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.length).toBe(1);
        expect(body[0].id).toBe(createdId);
        expect(_.isArray(body[0].todos)).toBe(true);
      }, done);

    });

    it('should return status code 404', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/-1/todos`, {
          method: 'GET'
        });

        expect(response.status).toBe(404);
      }, done);
    });
  });

  describe('GET /todo-lists', () => {
    it('should retrieve all ToDo Lists', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/`, {
          method: 'GET'
        });

        const body = await response.json();
        const createdEntry = _.find(body, { id: createdId });

        expect(response.status).toBe(200);
        expect(body.length).toBeGreaterThan(0);
        expect(createdEntry.id).toBe(createdId);
        expect(createdEntry.name).toBe(updatedData.name);
        expect(_.keys(createdEntry)).toEqual(expectedFields);
      }, done);
    });
  });

  describe('DELETE /todo-lists/{id}', () => {
    it('should delete one ToDo List', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/${createdId}`, {
          method : 'DELETE',
        });

        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body).toBe(1);
      }, done);
    });

    it('should return status code 404', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/-1`, {
          method: 'DELETE'
        });

        expect(response.status).toBe(404);
      }, done);
    });
  });
});
