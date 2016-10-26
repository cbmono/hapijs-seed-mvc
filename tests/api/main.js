import config from 'config';
import fetch from 'node-fetch' ;
import testUtil from '../testUtility';

//
// Tests
//
describe('API Test: Main', () => {

  describe('GET /healthcheck', () => {
    it('should return the server status', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/healthcheck`, {
          method : 'GET'
        });

        const body = await response.json();

        expect(response.ok).toBe(true);
        expect(response.status).toBe(200);
        expect(body.ping).toBe('pong');
        expect(body.timestamp).toBeGreaterThan(0);
        expect(body.database.healthy).toBe(true);
      }, done);
    });
  });

  describe('GET /{param*}', () => {
    it('should return index.html from ./public', async done => {
      await testUtil(async () => {
        const response = await fetch(`${config.apiUrl}/index.html`, {
          method : 'GET',
        });

        expect(response.status).toBe(200);
      }, done);
    });
  });
});
