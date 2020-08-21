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
    request(Application.init())
      .post('/users')
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
      .put('/users')
      .set('content-type', 'application/json')
      .send(JSON.stringify(testUser))
      .then((response) => {
        expect(response.statusCode).toBe(501)
        done()
      })
  })

  test('It should delete a user', (done) => {
    process.env['ENV'] = 'test'

    request(Application.init())
      .delete('/users/1')
      .then((response) => {
        expect(response.statusCode).toBe(501)
        done()
      })
  })
})
