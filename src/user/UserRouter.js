class UserRouter {
  constructor() {
    const UserController = require('./UserController')
    this.controller = new UserController()
  }

  applyRouting(router) {
    router.get('/', (request, response, next) => {
      this.controller.getUsers(request, response, next)
    })

    router.get('/:id', (request, response, next) => {
      this.controller.getUser(request, response, next)
    })

    router.post('/', (request, response, next) => {
      this.controller.createUser(request, response, next)
    })

    router.put('/', (request, response, next) => {
      this.controller.updateUser(request, response, next)
    })

    router.delete('/:id', (request, response, next) => {
      this.controller.deleteUser(request, response, next)
    })

    return router
  }
}

module.exports = UserRouter
