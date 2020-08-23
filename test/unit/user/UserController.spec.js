const request = require('supertest')
const Application = require('../../../src/Application')

describe('UserController tests', () => {
  beforeEach(() => {
    process.env['ENV'] = 'development'
  })

  test('It should respond with an array of objects', (done) => {
    request(Application.init())
      .get('/users')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  test('It should handle a page too big', (done) => {
    request(Application.init())
      .get('/users?page=9999')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        done()
      })
  })

  test('It should handle an invalid page', (done) => {
    request(Application.init())
      .get('/users?page=-1')
      .then((response) => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })

  test('It should return a specific user', (done) => {
    request(Application.init())
      .get('/users/1')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  test('It should return a  404 with odd id value', (done) => {
    request(Application.init())
      .get('/users/99999999999')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        done()
      })
  })

  test('It should return a  400 with a bad id value', (done) => {
    request(Application.init())
      .get('/users/-1')
      .then((response) => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })

  test('It should return a 415 for no content type header', (done) => {
    process.env['ENV'] = 'test'
    const testUser = {
      forename: 'Unit',
      surname: 'Test',
    }

    request(Application.init())
      .post('/users')
      .send(JSON.stringify(testUser))
      .then((response) => {
        expect(response.statusCode).toBe(415)
        done()
      })
  })

  test('It should return a 400 due to invalid params', (done) => {
    process.env['ENV'] = 'test'
    const testUser = {
      forename: 20,
      surname: 'Test',
    }

    request(Application.init())
      .post('/users')
      .set('content-type', 'application/json')
      .send(JSON.stringify(testUser))
      .then((response) => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })

  test('It should return allow a user to be created', (done) => {
    process.env['ENV'] = 'test'
    const testUser = {
      forename: 'Unit',
      surname: 'Test',
    }

    request(Application.init())
      .post('/users')
      .set('content-type', 'application/json')
      .send(JSON.stringify(testUser))
      .then((response) => {
        expect(response.statusCode).toBe(201)
        done()
      })
  })

  test('It should update a user', (done) => {
    process.env['ENV'] = 'test'
    const testUser = {
      id: 1,
      forename: 'Unit',
      surname: 'Testing123',
    }

    request(Application.init())
      .get('/users')
      .then((response) => {
        testUser.id = response.body.results[0].id
        expect(response.statusCode).toBe(200)

        request(Application.init())
          .put('/users')
          .set('content-type', 'application/json')
          .send(JSON.stringify(testUser))
          .then((r) => {
            expect(r.statusCode).toBe(200)
            done()
          })
      })
  })

  test('It should update a user', (done) => {
    process.env['ENV'] = 'test'
    const testUser = {
      forename: 'Unit',
      surname: 'Testing123',
    }

    request(Application.init())
      .get('/users')
      .then((response) => {
        const id = response.body.results[0].id
        expect(response.statusCode).toBe(200)

        request(Application.init())
          .put(`/users/${id}`)
          .set('content-type', 'application/json')
          .send(JSON.stringify(testUser))
          .then((r) => {
            expect(r.statusCode).toBe(200)
            done()
          })
      })
  })

  test('It should return a 404 when trying to update invalid user id', (done) => {
    process.env['ENV'] = 'test'
    const testUser = {
      id: 9999999999999999999999999999,
      forename: 'Unit',
      surname: 'Testing123',
    }

    request(Application.init())
      .put('/users')
      .set('content-type', 'application/json')
      .send(JSON.stringify(testUser))
      .then((response) => {
        expect(response.statusCode).toBe(404)
        done()
      })
  })

  test('It should return a 400 when trying to update invalid user id', (done) => {
    process.env['ENV'] = 'test'
    const testUser = {
      id: null,
      forename: 'Unit',
      surname: 'Testing123',
    }

    request(Application.init())
      .put('/users')
      .set('content-type', 'application/json')
      .send(JSON.stringify(testUser))
      .then((response) => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })

  test('It should return a 415 when trying to update invalid user content type header', (done) => {
    process.env['ENV'] = 'test'
    const testUser = {
      id: 1,
      forename: 'Unit',
      surname: 'Testing123',
    }

    request(Application.init())
      .put('/users')
      .send(JSON.stringify(testUser))
      .then((response) => {
        expect(response.statusCode).toBe(415)
        done()
      })
  })

  test('It should delete a user', (done) => {
    process.env['ENV'] = 'test'

    request(Application.init())
      .get('/users')
      .then((response) => {
        expect(response.statusCode).toBe(200)

        request(Application.init())
          .delete(`/users/${response.body.results[0].id}`)
          .then((r) => {
            expect(r.statusCode).toBe(204)
            done()
          })
      })
  })

  test('It should return a 404 when delete a user with an invalid id', (done) => {
    process.env['ENV'] = 'test'

    request(Application.init())
      .delete('/users/999999999999999999999999999999')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        done()
      })
  })

  test('It should return a 400 when delete a user with an invalid id', (done) => {
    process.env['ENV'] = 'test'

    request(Application.init())
      .delete('/users/-9090')
      .then((response) => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })

  test('It should run next when running handleError', () => {
    process.env['ENV'] = 'test'
    Application.init()
    const UserController = require('../../../src/user/UserController')
    const controller = new UserController()
    const exception = new Error('This is a test...')
    let handled = false

    const mockNext = (e) => {
      expect(e).toBe(exception)
      handled = true
    }

    const mockResponse = {
      setHeader: () => {},
      status: () => {},
      send: () => {},
    }

    controller.handleError(exception, false, mockNext, mockResponse)
    expect(handled).toBe(true)
  })
})
