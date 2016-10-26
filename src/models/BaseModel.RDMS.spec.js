import { BaseModelRDMS } from './BaseModel.RDMS';

//
// Tests
//
describe('Model: BaseModelRDMS', () => {
  let model;
  let ExtentedClass;

  beforeEach(() => {
    ExtentedClass = class ext extends BaseModelRDMS {};
    model = new ExtentedClass('EMPTY_TABLE');
  });

  it('should not instantiated directly', () => {
    expect(() => new BaseModelRDMS('DBTABLENAME')).toThrow(Error('BaseModelRDMS is an abstract class and cannot be instantiated directly'));
  });

  it('should be defined and have access to Knex', () => {
    expect(model).not.toBe(undefined);
    expect(model.Knex).not.toBe(undefined);
    expect(model.setTimestamps).toBe(true);
  });

  it('should properly set the DB table name and timestamp option', () => {
    const tableName = 'hello_world';
    const timestamp = false;
    const baseModel = new ExtentedClass(tableName, timestamp);

    expect(baseModel.tableName).toBe(tableName);
    expect(baseModel.setTimestamps).toBe(timestamp);
  });

  it('should throw on empty DB table name', () => {
    try {
      new ExtentedClass();
    }
    catch (exc) {
      expect(exc.name).toBe('Error');
      expect(exc.message).toBe('DB table name undefined');
    }
  });

  describe('find methods', () => {
    let knexRes;

    beforeEach(() => {
      knexRes = (spyOn(model, 'Knex').and.returnValue(({
        where: () => {},
        whereIn: () => {},
      })))();

      spyOn(knexRes, 'where').and.returnValue(Promise.resolve({}));
      spyOn(knexRes, 'whereIn').and.returnValue(Promise.resolve({}));
    });

    it('should expose findAll()', () => {
      model.findAll();
      expect(model.Knex).toHaveBeenCalledWith(model.tableName);
    });

    it('should expose findBy()', () => {
      const field = 'id';
      const value1 = 1;
      const value2 = [1, 2, 3];

      model.findBy(field, value1);
      expect(model.Knex).toHaveBeenCalledWith(model.tableName);
      expect(knexRes.where).toHaveBeenCalledWith(field, value1);

      model.findBy(field, value2);
      expect(model.Knex).toHaveBeenCalledWith(model.tableName);
      expect(knexRes.whereIn).toHaveBeenCalledWith(field, value2);
    });

    it('should expose findById()', () => {
      const id = 1;

      spyOn(model, 'findBy').and.returnValue(Promise.resolve({}));
      model.findById(id);

      expect(model.findBy).toHaveBeenCalledWith('id', id);
    });
  });

  describe('save/update methods', () => {
    const name = 'Some cool name';
    const data = { name };

    let knexRes;
    let insertRes;
    let updateRes;

    beforeEach(() => {
      spyOn(model, 'dbConfig').and.returnValue({ client: 'pg' });
      spyOn(model, 'now').and.returnValue('NOW()');
      spyOn(model, 'findById').and.returnValue(Promise.resolve({}));

      /* eslint no-unused-expressions: 0*/
      /* eslint no-unused-labels: 0*/
      /* eslint no-labels: 0*/
      knexRes = (spyOn(model, 'Knex').and.returnValue(({
        insert: () => { returning: () => {}; },
        update: () => { whereIn: () => {}; }
      })))();

      insertRes = (spyOn(knexRes, 'insert').and.returnValue({ returning: () => {} }))();
      spyOn(insertRes, 'returning').and.returnValue(Promise.resolve({}));

      updateRes = (spyOn(knexRes, 'update').and.returnValue({ whereIn: () => {} }))();
      spyOn(updateRes, 'whereIn').and.returnValue(Promise.resolve({}));
    });

    describe('should expose save()', () => {
      it('should set timestamps if \'setTimestamps = true\'', () => {
        model.setTimestamps = true;
        model.save(data);

        expect(model.Knex).toHaveBeenCalledWith(model.tableName);
        expect(knexRes.insert).toHaveBeenCalledWith({
          name,
          created_at: 'NOW()',
          updated_at: 'NOW()',
        });
      });

      it('should not set timestamps if \'setTimestamps = false\'', () => {
        model.setTimestamps = false;
        model.save(data);

        expect(knexRes.insert).toHaveBeenCalledWith(data);
      });

      it('should call returning(\'*\') if PostgreSQL', () => {
        model.dbConfig.client = 'pg';
        model.save(data);

        expect(insertRes.returning).toHaveBeenCalledWith(('*'));
      });

      it('should not call returning(\'*\') if not PostgreSQL', () => {
        model.dbConfig.client = 'something else';
        model.save(data);

        expect(insertRes.returning).not.toHaveBeenCalled();
      });
    });

    describe('should expose update()', () => {
      const id = 1;

      it('should set timestamps if \'setTimestamps = true\'', (done) => {
        model.setTimestamps = true;

        model.update(id, data).then(() => {
          expect(model.Knex).toHaveBeenCalledWith(model.tableName);
          expect(knexRes.update).toHaveBeenCalledWith({
            name,
            updated_at: 'NOW()',
          });
          expect(updateRes.whereIn).toHaveBeenCalledWith('id', id);
          expect(model.findById).toHaveBeenCalledWith(id);

          done();
        });
      });

      it('should not set timestamps if \'setTimestamps = false\'', () => {
        model.setTimestamps = false;
        model.update(id, data);

        expect(knexRes.update).toHaveBeenCalledWith(data);
      });
    });
  });

  describe('delete methods', () => {
    const id = 1;
    let knexRes;
    let deleteRes;

    beforeEach(() => {
      knexRes = (spyOn(model, 'Knex').and.returnValue(({
        del: () => {},
      })))();

      deleteRes = (spyOn(knexRes, 'del').and.returnValue({ whereIn: () => {} }))();
      spyOn(deleteRes, 'whereIn').and.returnValue(Promise.resolve({}));
    });

    it('should expose remove()', () => {
      model.remove(id);

      expect(model.Knex).toHaveBeenCalledWith(model.tableName);
      expect(knexRes.del).toHaveBeenCalled();
      expect(deleteRes.whereIn).toHaveBeenCalledWith('id', id);
    });

    it('should expose del()', () => {
      spyOn(model, 'remove').and.returnValue(Promise.resolve({}));
      model.del(id);

      expect(model.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('other internal methods', () => {
    beforeEach(() => {
      spyOn(model, 'dbConfig').and.returnValue({ client: 'pg' });
      spyOn(model.Knex, 'raw').and.callThrough();
    });

    it('should expose now()', () => {
      const now = model.now();

      expect(model.Knex.raw).toHaveBeenCalledWith('NOW()');
      expect(now.sql).toBe('NOW()');
    });

    it('should expose now() with support for SQLite', () => {
      model.dbConfig.client = 'sqlite3';
      const now = model.now();

      expect(model.Knex.raw).toHaveBeenCalledWith('date(\'now\')');
      expect(now.sql).toBe('date(\'now\')');
    });
  });
});
