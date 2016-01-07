'use strict'

//
// Internal dependencies
//
const dbConfig = require('config').get('database')

//
// External dependencies
//
const knex = require('knex')(dbConfig)


//
// Export module
//
module.exports = knex
