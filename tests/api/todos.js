import _ from 'lodash';
import config from 'config';
import fetch from 'node-fetch' ;
import testUtil from '../testUtility';


//
// Tests
//
describe('API Test: ToDo\'s', () => {
  /**
   * NOTE: follow this order for API Tests
   *
   * CREATE -> UPDATE -> VIEW -> VIEW ALL -> DELETE -> Done!
   */

  let todoListId;
  let createdId;

  const createdData = { name : 'New ToDo' };
  const updatedData = { name : 'Updated ToDo name' };

  // Expected fields for ToDo's
  const expectedFields = ['id', 'todo_list_id', 'name', 'created_at', 'updated_at'];

  describe('POST /todo-lists', () => {
    it('should start by creating a new ToDo List', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists`, {
          method: 'POST',
          body: JSON.stringify({ name : 'Temp ToDo List' })
        });

        const body = await response.json();

        todoListId = body[0].id;
        createdData.todo_list_id = todoListId;
      }, done);
    });
  });

  describe('POST /todos', () => {
    it('should create a new ToDo', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos`, {
          method: 'POST',
          body: JSON.stringify(createdData)
        });

        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.length).toBe(1);
        expect(body[0].id).toBeGreaterThan(0);
        expect(body[0].todo_list_id).toBe(todoListId);
        expect(body[0].name).toBe(createdData.name);
        expect(body[0].created_at).toBe(body[0].updated_at);
        expect(_.keys(body[0])).toEqual(expectedFields);

        createdId = body[0].id;
      }, done);
    });

    it('should return status code 400', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos`, {
          method: 'POST'
        });

        expect(response.status).toBe(400);
      }, done);
    });
  });

  describe('PUT /todos/{id}', () => {
    it('should update an existing ToDo', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos/${createdId}`, {
          method: 'PUT',
          body: JSON.stringify(updatedData)
        });

        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.length).toBe(1);
        expect(body[0].id).toBe(createdId);
        expect(body[0].todo_list_id).toBe(todoListId);
        expect(body[0].name).toBe(updatedData.name);
        expect(body[0].created_at).not.toBe(body[0].updated_at);
        expect(_.keys(body[0])).toEqual(expectedFields);
      }, done);
    });

    it('should return status code 400', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos/${createdId}`, {
          method: 'PUT',
        });

        expect(response.status).toBe(400);
      }, done);
    });

    it('should return status code 404', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos/-1`, {
          method: 'PUT',
          body: JSON.stringify(updatedData)
        });

        expect(response.status).toBe(404);
      }, done);
    });
  });

  describe('GET /todos/{id}', () => {
    it('should retrieve one ToDo', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos/${createdId}`, {
          method: 'GET'
        });

        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.length).toBe(1);
        expect(body[0].id).toBe(createdId);
        expect(body[0].todo_list_id).toBe(todoListId);
        expect(body[0].name).toBe(updatedData.name);
        expect(_.keys(body[0])).toEqual(expectedFields);
      }, done);
    });

    it('should return status code 404', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos/-1`, {
          method: 'GET'
        });

        expect(response.status).toBe(404);
      }, done);
    });
  });

  describe('GET /todos', () => {
    it('should retrieve all ToDo\'s', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos`, {
          method: 'GET'
        });

        const body = await response.json();
        const createdEntry = _.find(body, { id : createdId });

        expect(response.status).toBe(200);
        expect(body.length).toBeGreaterThan(0);
        expect(createdEntry.id).toBe(createdId);
        expect(createdEntry.todo_list_id).toBe(todoListId);
        expect(createdEntry.name).toBe(updatedData.name);
        expect(_.keys(createdEntry)).toEqual(expectedFields);
      }, done);
    });
  });

  describe('DELETE /todos/{id}', () => {
    it('should delete one ToDo', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos/${createdId}`, {
          method: 'DELETE'
        });

        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body).toBe(1);
      }, done);
    });

    it('should return status code 404', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todos/-1`, {
          method: 'DELETE'
        });

        expect(response.status).toBe(404);
      }, done);
    });
  });

  describe('DELETE /todo-lists/{id}', () => {
    it('should end by deleting the created ToDo List', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/todo-lists/${todoListId}`, {
          method: 'DELETE'
        });
        
        expect(response.status).toBe(200);
      }, done);
    });
  });
});
