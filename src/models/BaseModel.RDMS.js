//
// External dependencies
//
const _ = require('lodash')

//
// Internal dependencies
//
const Knex = require('../db')
const logger = require('../logger')
const dbConfig = require('config').get('database')


/******************************************
 *
 * Base Model for Relational Databases using Knex.js
 *
 * This (abstract) class is meant to extend any custom model
 * by providing baisc find/findBy and CRUD methods, such as:
 *
 * 		* find()
 * 		* findBy()
 * 		* save()
 * 		* update()
 * 		* ... etc.
 *
 * Supported Relational Databases :
 *
 *    * MySQL
 *    * MariaDB
 *    * SQLite3
 *    * Postgres
 *
 * @see: http://knexjs.org/
 *
 ******************************************/
module.exports = class BaseModelRDMS {

  /**
   * Constructor
   *
   * @param {string} tableName
   * @param {boolean} setTimestamps [optional]
   *        Option to decide whether to update the fields `created_at`
   *        and `updated_at` on save() and update()
   */
  constructor(tableName, setTimestamps = true) {
    this.log = logger
    this.Knex = Knex
    this.tableName = tableName
    this.setTimestamps = setTimestamps

    if (!tableName) {
      throw new Error('Model: DB table name undefined')
    }
  }

  /**
   * Fetch all entries from DB table
   *
   * @return {promise}
   */
  findAll() {
    return this.Knex(this.tableName)
  }

  /**
   * Fetch one/many result(s) from the DB by a specific field
   *
   * @param {string} field
   * @param {mixed|array} value
   *        In case of Array, Knex.whereIn() is going to be used
   * @return {promise}
   */
  findBy(field, value) {
    if (Array.isArray(value)) {
      return this.Knex(this.tableName).whereIn(field, value)
    }

    return this.Knex(this.tableName).where(field, value)
  }

  /**
   * Fetch one result from the DB by passing the primary key (id)
   *
   * @param {mixed} id
   * @return {promise}
   */
  findById(id) {
    return this.findBy('id', id)
      // Don't return an array, since the result should be only one
      .then((results) => results.pop())
  }

  /**
   * Create one/many new entries into the DB
   *
   * @param {object|array} data
   *        One object with the values for each field
   *        or array of objects in case of many simultaneous inserts
   * @return {promise}
   */
  save(data) {
    if (this.setTimestamps) {
      data = this._setTimestamps(data)
    }

    response = this.Knex(this.tableName).insert(data)

    if (dbConfig.client === 'pg') {
      // Return all inserted rows in case of Postgres
      return response.returning('*')
    }

    return response
  }

  /**
   * Update one/many existing entries
   *
   * @param {mixed|array} id
   *        One single ID or array of ID's
   * @param {object} data
   *        Object with fields to be updated
   * @return {promise}
   *         Contains an object with the updated data
   */
  update(id, data) {
    if (this.setTimestamps) {
      data = this._setTimestamps(data, false)
    }

    return this.Knex(this.tableName)
      .update(data)
      .whereIn('id', id)
  }

  /**
   * Delete one/many entries
   *
   * @param {mixed|array} id
   *        One single ID or array of ID's
   * @return {promise}
   */
  remove(id) {
    return this.Knex(this.tableName)
      .whereIn('id', id)
      .del()
  }

  /**
   * Delete one/many entries
   * (Alias for `remove()`)
   *
   * @param {mixed|array} id
   *        One single ID or array of ID's
   * @return {promise}
   */
  del(id) {
    return this.remove(id)
  }

  /**
   * Create a DateTime string with the current server time
   *
   * @return {string}
   */
  now() {
    let timestamp = this.Knex.raw('NOW()')

    if (dbConfig.client === 'sqlite3') {
      timestamp = this.Knex.raw("date('now')")
    }

    return timestamp
  }


  /******************************************
   *
   * Private methods
   *
   ******************************************/

  /**
   * Set the current timestamp for the fields `created_at` and `updated_at`
   *
   * @param {object} data
   * @param {boolean} setCreatedAt [optional]
   *        Omit setting `created_at` (ie. in case of updates)
   * @return {string}
   */
  _setTimestamps(data, setCreatedAt = true) {
    let now = this.now()
    let newData = _.cloneDeep(data)

    if (setCreatedAt) {
      newData.created_at = now
    }

    newData.updated_at = now
    return newData
  }
}
