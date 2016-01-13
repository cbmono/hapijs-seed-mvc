import * as Q  from 'q'
import { BaseModelRDMS } from './BaseModel.RDMS'


//
// Tests
//
describe('Model: BaseModelRDMS', () => {
  let model

  beforeEach(() => {
    model = new BaseModelRDMS('EMPTY_TABLE')
  })

  it('should be defined and have access to Knex', () => {
    expect(model).not.toBe(undefined)
    expect(model.Knex).not.toBe(undefined)
    expect(model.setTimestamps).toBe(true)
  })

  it('should properly set the DB table name and timestamp option', () => {
    let tableName = 'hello_world'
      , timestamp = false
      , baseModel = new BaseModelRDMS(tableName, timestamp)

    expect(baseModel.tableName).toBe(tableName)
    expect(baseModel.setTimestamps).toBe(timestamp)
  })

  it('should throw on empty DB table name', () => {
    try {
      new BaseModelRDMS()
    }
    catch (exc) {
      expect(exc.name).toBe('Error')
      expect(exc.message).toBe('DB table name undefined')
    }
  })

  describe('find methods', () => {
    let knexRes

    beforeEach(() => {
      knexRes = (spyOn(model, 'Knex').and.returnValue(({
        where: () => {},
        whereIn: () => {}
      })))()

      spyOn(knexRes, 'where').and.returnValue(Q.when({}))
      spyOn(knexRes, 'whereIn').and.returnValue(Q.when({}))
    })

    it('should expose findAll()', () => {
      model.findAll()
      expect(model.Knex).toHaveBeenCalledWith(model.tableName)
    })

    it('should expose findBy()', () => {
      let field = 'id'
        , value1 = 1
        , value2 = [ 1, 2, 3 ]

      model.findBy(field, value1)
      expect(model.Knex).toHaveBeenCalledWith(model.tableName)
      expect(knexRes.where).toHaveBeenCalledWith(field, value1)

      model.findBy(field, value2)
      expect(model.Knex).toHaveBeenCalledWith(model.tableName)
      expect(knexRes.whereIn).toHaveBeenCalledWith(field, value2)
    })

    it('should expose findById()', () => {
      let id = 1

      spyOn(model, 'findBy').and.returnValue(Q.when({}))
      model.findById(id)

      expect(model.findBy).toHaveBeenCalledWith('id', id)
    })
  })

  describe('save/update methods', () => {
    let name = 'Some cool name'
      , data = { name: name }
      , knexRes
      , insertRes
      , updateRes

    beforeEach(() => {
      spyOn(model, 'dbConfig').and.returnValue({ client: 'pg' })
      spyOn(model, 'now').and.returnValue('NOW()')
      spyOn(model, 'findById').and.returnValue(Q.when({}))
      spyOn(model, '_setTimestamps').and.callThrough()

      knexRes = (spyOn(model, 'Knex').and.returnValue(({
        insert: () => { returning: () => {}},
        update: () => { whereIn: () => {}}
      })))()

      insertRes = (spyOn(knexRes, 'insert').and.returnValue({ returning: () => {}}))()
      spyOn(insertRes, 'returning').and.returnValue(Q.when({}))

      updateRes = (spyOn(knexRes, 'update').and.returnValue({ whereIn: () => {}}))()
      spyOn(updateRes, 'whereIn').and.returnValue(Q.when({}))
    })

    describe('should expose save()', () => {
      it(`should set timestamps if 'setTimestamps = true'`, () => {
        model.setTimestamps = true
        model.save(data)

        expect(model.Knex).toHaveBeenCalledWith(model.tableName)
        expect(model._setTimestamps).toHaveBeenCalledWith(data)
        expect(knexRes.insert).toHaveBeenCalledWith({
          name: name,
          created_at: 'NOW()',
          updated_at: 'NOW()'
        })
      })

      it(`should not set timestamps if 'setTimestamps = false'`, () => {
        model.setTimestamps = false
        model.save(data)

        expect(model._setTimestamps).not.toHaveBeenCalled()
        expect(knexRes.insert).toHaveBeenCalledWith(data)
      })

      it(`should call returning('*') if PostgreSQL`, () => {
        model.dbConfig.client = 'pg'
        model.save(data)

        expect(insertRes.returning).toHaveBeenCalledWith(('*'))
      })

      it(`should not call returning('*') if not PostgreSQL`, () => {
        model.dbConfig.client = 'something else'
        model.save(data)

        expect(insertRes.returning).not.toHaveBeenCalled()
      })
    })

    describe('should expose update()', () => {
      let id = 1

      it(`should set timestamps if 'setTimestamps = true'`, (done) => {
        model.setTimestamps = true

        model.update(id, data).then(() => {
          expect(model.Knex).toHaveBeenCalledWith(model.tableName)
          expect(model._setTimestamps).toHaveBeenCalledWith(data, false)
          expect(knexRes.update).toHaveBeenCalledWith({
            name: name,
            updated_at: 'NOW()'
          })
          expect(updateRes.whereIn).toHaveBeenCalledWith('id', id)
          expect(model.findById).toHaveBeenCalledWith(id)
          done()
        })
      })

      it(`should not set timestamps if 'setTimestamps = false'`, () => {
        model.setTimestamps = false
        model.update(id, data)

        expect(model._setTimestamps).not.toHaveBeenCalled()
        expect(knexRes.update).toHaveBeenCalledWith(data)
      })
    })
  })

  describe('delete methods', () => {
    let id = 1
      , knexRes
      , deleteRes

    beforeEach(() => {
      knexRes = (spyOn(model, 'Knex').and.returnValue(({
        del: () => {}
      })))()

      deleteRes = (spyOn(knexRes, 'del').and.returnValue({ whereIn: () => {}}))()
      spyOn(deleteRes, 'whereIn').and.returnValue(Q.when({}))
    })

    it('should expose remove()', () => {
      model.remove(id)

      expect(model.Knex).toHaveBeenCalledWith(model.tableName)
      expect(knexRes.del).toHaveBeenCalled()
      expect(deleteRes.whereIn).toHaveBeenCalledWith('id', id)
    })

    it('should expose del()', () => {
      spyOn(model, 'remove').and.returnValue(Q.when({}))
      model.del(id)

      expect(model.remove).toHaveBeenCalledWith(id)
    })
  })

  describe('other internal methods', () => {
    beforeEach(() => {
      spyOn(model, 'dbConfig').and.returnValue({ client: 'pg' })
      spyOn(model.Knex, 'raw').and.callThrough()
    })

    it('should expose now()', () => {
      let now = model.now()

      expect(model.Knex.raw).toHaveBeenCalledWith('NOW()')
      expect(now.sql).toBe('NOW()')
    })

    it('should expose now() with support for SQLite', () => {
      model.dbConfig.client = 'sqlite3'
      let now = model.now()

      expect(model.Knex.raw).toHaveBeenCalledWith(`date('now')`)
      expect(now.sql).toBe(`date('now')`)
    })
  })
})
