//
// External dependencies
//
const chai = require('chai')
const expect = chai.expect

//
// Internal dependencies
//
const controller = require('./main.controller')

//
// Tests
//
describe('Controller: Main', () => {

  it('should be defined', () => {
    expect(controller).not.to.be.undefined
  })

  it('should expose healthcheck()', () => {
    expect(controller.healthcheck).not.to.be.undefined
  })
})
