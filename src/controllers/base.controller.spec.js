//
// External dependencies
//
const chai = require('chai')
const expect = chai.expect

//
// Internal dependencies
//
const controller = require('./base.controller')

//
// Tests
//
describe('Controller: Base', () => {

  it('should be defined', () => {
    expect(controller).not.to.be.undefined
  })
})
