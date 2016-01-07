'use strict'

class Test {
  index() {
    return {
      method: 'GET',
      path: '/{name}',
      handler: (request, reply) => {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!')
      }
    }
  }
}

// module.exports = Test

let routes = new Test()
module.exports = [
  routes.index()
]
