const isNull = require('../../../src/libs/isNull')

describe('isNull tests', () => {
  test('It should return true with null', () => {
    expect(isNull(null)).toBe(true)
  })

  test('It should return true with undefined', () => {
    expect(isNull(undefined)).toBe(true)
  })

  test('It should return false with some random string', () => {
    expect(isNull('test')).toBe(false)
  })
})
