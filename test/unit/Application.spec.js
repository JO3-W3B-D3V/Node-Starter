const request = require('supertest')
const Application = require('../../src/Application')

describe('Application tests', () => {
  beforeEach(() => {
    process.env['ENV'] = 'test'
  })

  test('It should hanlde a 404 request', (done) => {
    request(Application.init())
      .get('/fdhsjfhdskjfhkdjsfkjdsk')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        done()
      })
  })

  test('It should output the right status code for 201', () => {
    expect(Application.getErrorStatusCode(undefined)).toBe(500)
    expect(Application.getErrorStatusCode(null)).toBe(500)
    expect(Application.getErrorStatusCode({ status: null })).toBe(500)
    expect(Application.getErrorStatusCode({ status: undefined })).toBe(500)
    expect(Application.getErrorStatusCode({ status: 401 })).toBe(401)
  })
})
