class UserRouter {
  constructor() {
    const UserController = require('./UserController')
    this.controller = new UserController()
  }

  applyRouting(router) {
    router.get('/', (request, response, next) => {
      this.controller.page(request, response, next)
    })

    router.post('/', (request, response, next) => {
      this.controller.create(request, response, next)
    })

    router.get('/:id', (request, response, next) => {
      this.controller.read(request, response, next)
    })

    router.put('/', (request, response, next) => {
      this.controller.update(request, response, next)
    })

    router.put('/:id', (request, response, next) => {
      this.controller.update(request, response, next)
    })

    router.delete('/:id', (request, response, next) => {
      this.controller.delete(request, response, next)
    })

    return router
  }
}

module.exports = UserRouter
