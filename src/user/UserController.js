const isNull = require('../libs/isNull')
const AbstractController = require('../AbstractController')
const createError = require('http-errors')

class UserController extends AbstractController {
  constructor() {
    super()
    const UserService = require('./UserService')
    this.service = new UserService()
  }

  async page(request, response, next) {
    try {
      const pageNumber = !isNull(request.query.page) ? request.query.page : 1
      const pages = pageNumber > 0 && !isNaN(pageNumber) ? await this.service.getTotalNumberOfPages() : 0

      // console.log(pageNumber, pages)
      // console.log(await this.service.getTotalNumberOfPages())

      if (pageNumber > pages) {
        return next(createError(404, `No users found on the page ${pageNumber}`))
      }

      const results = await this.service.getUsersByPage(pageNumber)
      response.setHeader('Content-Type', 'application/json')
      response.status(200)
      response.send({ results, pages })
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }

  async create(request, response, next) {
    try {
      const isJsonObject = this.isJsonRequest(request.headers['content-type'])

      if (!isJsonObject.isJson) {
        return next(this.createError(415, isJsonObject.msg))
      }

      await this.service.createUser(request.body)
      response.setHeader('Content-Type', 'text/plain')
      response.status(201)
      response.send()
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }

  async read(request, response, next) {
    try {
      const id = request.params.id
      const user = await this.service.getUserById(id)
      if (isNull(user)) {
        console.log('NO USER FOUND')
        console.log(id, user)

        return next(createError(404, `No user found with the id of ${id}`))
      }

      response.setHeader('Content-Type', 'application/json')
      response.status(200)
      response.send(user)
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }

  async update(request, response, next) {
    try {
      const getId = (r) => (!isNull(r.params.id) ? r.params.id : !isNull(r.body.id) ? r.body.id : -1)
      const id = getId(request)
      const isJsonObject = this.isJsonRequest(request.headers['content-type'])

      if (!isJsonObject.isJson) {
        return next(this.createError(415, isJsonObject.msg))
      }

      if (isNull(await this.service.getUserById(id))) {
        return next(createError(404, `No user found with the id of ${id}`))
      }

      request.body.id = id // Just in the event it was /users/:id
      await this.service.updateUser(request.body)
      response.setHeader('Content-Type', 'application/json')
      response.status(200)
      response.send({ forename: request.body.forename, surname: request.body.surname })
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }

  async delete(request, response, next) {
    try {
      const id = request.params.id
      const user = await this.service.getUserById(id)

      if (isNull(user)) {
        return next(createError(404, `No user found with the id of ${id}`))
      }

      await this.service.deleteUserById(id)
      response.setHeader('Content-Type', 'text/plain')
      response.status(204)
      response.send()
    } catch (exception) {
      next(createError(exception.status, exception.message))
    }
  }
}

module.exports = UserController
