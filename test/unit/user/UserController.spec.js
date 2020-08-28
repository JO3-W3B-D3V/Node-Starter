const UserController = require('../../../src/user/UserController')
const UserService = require('../../../src/user/UserService')
const UserClientError = require('../../../src/user/UserClientError')
jest.mock('../../../src/user/UserService')

describe('UserController unit tests', () => {
  let user
  let mockService
  let controller
  let mockRequest
  let mockResponse
  let mockNextFunction
  let expectedStatus

  beforeEach(() => {
    mockNextFunction = () => fail('it should not reach here')
    expectedStatus = 200
    user = {
      forename: 'Joe',
      surname: 'Bloggs',
    }

    mockResponse = {
      status: (s) => expect(s).toBe(expectedStatus),
      setHeader: (f) => f,
      send: (f) => f,
    }

    mockRequest = {
      query: {
        page: 1,
      },
      headers: {
        'content-type': 'application/json',
      },
      body: { ...user },
      params: {
        id: 1,
      },
    }

    const page = {
      results: { ...user },
      pages: 1,
    }

    mockService = new UserService()
    mockService.getUserById.mockResolvedValue({ ...user })
    mockService.getTotalNumberOfPages.mockResolvedValue(1)
    mockService.getUsersByPage.mockResolvedValue(page)
    mockService.createUser.mockResolvedValue(null)
    mockService.updateUser.mockResolvedValue(undefined)
    mockService.deleteUserById.mockResolvedValue(undefined)

    controller = new UserController()
  })

  test('It should get a page of users with success', () => {
    expectedStatus = 200
    controller.page(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should get a page of users, providing no params with success', () => {
    expectedStatus = 200
    delete mockRequest.query.page
    controller.page(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should create a new user with success', () => {
    expectedStatus = 201
    controller.create(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should read an existing user with success', () => {
    expectedStatus = 200
    controller.service = mockService
    controller.read(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should update an existing user with success', () => {
    expectedStatus = 200
    controller.service = mockService
    controller.update(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should update an existing user by using the body param with success', () => {
    expectedStatus = 200
    delete mockRequest.params.id
    mockRequest.body.id = 1
    controller.service = mockService
    controller.update(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should delete an existing user with success', () => {
    expectedStatus = 204
    controller.service = mockService
    controller.delete(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to get a page of users because of an invalid data type', (done) => {
    expectedStatus = 400
    mockRequest.query.page = 'test'
    const msg = 'Mock worked'
    mockService.getUsersByPage.mockImplementation((page) => {
      if (isNaN(page)) {
        throw new UserClientError(msg)
      }
    })
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      expect(e.message).toBe(msg)
      done()
    }
    controller.service = mockService
    controller.page(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to get a page of users because the page value exceeds the number of pages', (done) => {
    expectedStatus = 404
    mockService.getTotalNumberOfPages.mockImplementation(() => -1)
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      done()
    }
    controller.service = mockService
    controller.page(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to create a new user since there is no content type header', (done) => {
    expectedStatus = 415
    delete mockRequest.headers['content-type']
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      done()
    }
    controller.service = mockService
    controller.create(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to create a new user due to an unexpected error with the service', (done) => {
    expectedStatus = 500
    const msg = 'Mock worked'
    mockService.createUser.mockImplementation((page) => {
      if (isNaN(page)) {
        throw new UserClientError(msg, expectedStatus)
      }
    })
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      expect(e.message).toBe(msg)
      done()
    }
    controller.service = mockService
    controller.create(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to read an existing user due to there being no user for the given id', (done) => {
    expectedStatus = 404
    mockService.getUserById.mockResolvedValue(null)
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      done()
    }
    controller.service = mockService
    controller.read(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to read an existing user due to an unexpected error with the service', (done) => {
    expectedStatus = 500
    const msg = 'Mock worked'
    mockService.getUserById.mockImplementation(() => {
      throw new UserClientError(msg, expectedStatus)
    })
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      expect(e.message).toBe(msg)
      done()
    }
    controller.service = mockService
    controller.read(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to update an existing user since there is no content type header', (done) => {
    expectedStatus = 415
    delete mockRequest.headers['content-type']
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      done()
    }
    controller.service = mockService
    controller.update(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to update an existing user since there is no user with the given id', (done) => {
    expectedStatus = 404
    mockService.getUserById.mockResolvedValue(null)
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      done()
    }
    controller.service = mockService
    controller.update(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to update an existing user since there is an unexpected error with the service', (done) => {
    expectedStatus = 404
    const msg = 'Mock worked'
    mockService.getUserById.mockImplementation(() => {
      throw new UserClientError(msg, expectedStatus)
    })
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      expect(e.message).toBe(msg)
      done()
    }
    controller.service = mockService
    controller.update(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to delete an existing user since there is no user with the given id', (done) => {
    expectedStatus = 404
    mockService.getUserById.mockResolvedValue(null)
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      done()
    }
    controller.service = mockService
    controller.delete(mockRequest, mockResponse, mockNextFunction)
  })

  test('It should fail to delete an existing user since there is an unexpected error with the service', (done) => {
    expectedStatus = 404
    const msg = 'Mock worked'
    mockService.getUserById.mockImplementation(() => {
      throw new UserClientError(msg, expectedStatus)
    })
    mockNextFunction = (e) => {
      expect(e.status).toBe(expectedStatus)
      expect(e.message).toBe(msg)
      done()
    }
    controller.service = mockService
    controller.delete(mockRequest, mockResponse, mockNextFunction)
  })
})
