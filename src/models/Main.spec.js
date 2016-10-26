import { Main } from './Main';

//
// Tests
//
describe('Model: Main', () => {
  let model;

  beforeEach(() => {
    model = new Main();
  });

  it('should be defined and inherit from BaseModelRDMS', () => {
    expect(model).not.toBe(undefined);
    expect(model.Knex).not.toBe(undefined);
  });

  it('should expose doHealthcheck()', (done) => {
    spyOn(model.Knex, 'raw').and.returnValue(Promise.resolve({}));

    model.doHealthcheck().then((response) => {
      expect(model.Knex.raw).toHaveBeenCalledWith('SELECT 1+1 AS result');
      expect(response.ping).toBe('pong');
      expect(response.uptime).toBeDefined();
      expect(response.timestamp).toBeDefined();
      expect(response.database.healthy).toBe(true);

      done();
    });
  });

  it('should inform when the DB is not healthy', (done) => {
    spyOn(model.Knex, 'raw').and.returnValue(Promise.reject({}));

    model.doHealthcheck().then((response) => {
      expect(model.Knex.raw).toHaveBeenCalled();
      expect(response.database.healthy).toBe(false);

      done();
    });
  });
});
