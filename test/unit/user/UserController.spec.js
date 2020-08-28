const UserController = require('../../../src/user/UserController')
const UserService = require('../../../src/user/UserService')
jest.mock('../../../src/user/UserService')

describe('UserController tests', () => {
  let user
  let mockService
  let controller
  let mockRequest
  let mockResponse
  let mockNextFunction
  let expectedStatus
  let resultStats

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

  test('It should read an existing user with success', async () => {
    expectedStatus = 200
    const resultUser = await mockService.getUserById(1)
    console.log(resultUser)
    expect(resultUser).toStrictEqual(user)

    controller.read(mockRequest, mockResponse, mockNextFunction)
  })

  // test('It should update an existing user with success', () => {
  //   expectedStatus = 200
  //   controller.update(mockRequest, mockResponse, mockNextFunction)
  // })

  // test('It should delete an existing user with success', () => {
  //   expectedStatus = 204
  //   mockResponse.status = (s) => expect(s).toBe(expectedStatus)
  //   controller.delete(mockRequest, mockResponse, mockNextFunction)
  // })

  // test('It should fail to get a page of users because of an invalid data type', () => {
  //   expectedStatus = 400
  //   mockRequest.query.page = 'test'
  //   mockResponse.status = (s) => expect(s).toBe(expectedStatus)
  //   controller.page(mockRequest, mockResponse, mockNextFunction)
  // })

  // test('It should fail to get a page of users because the page value exceeds the number of pages', () => {
  //   expectedStatus = 404
  //   mockRequest.query.page = 2
  //   mockResponse.status = (s) => {
  //     expect(s).toBe(expectedStatus)
  //     // console.log(s, expectedStatus)
  //   }
  //   // console.log(mockResponse.status.toString())
  //   controller.page(mockRequest, mockResponse, mockNextFunction)
  // })
})
