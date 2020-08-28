const { Logger, log } = require('../../../src/libs/Logger')

describe('Logger unit tests', () => {
  test('It should be using the test logger', () => {
    process.env['ENV'] = 'test'
    expect(new Logger('test').printer.fields.name).toBe('test')
  })

  test('It should be using the development logger', () => {
    process.env['ENV'] = 'development'
    expect(new Logger(process.env['ENV']).printer.fields.name).toBe('development')
  })

  test('It should be using the production logger', () => {
    process.env['ENV'] = 'production'
    expect(new Logger(process.env['ENV']).printer.fields.name).toBe('production')
  })

  test('It should be using the test logger by default', () => {
    process.env['ENV'] = 'girls just wanna have fun'
    expect(new Logger('girls just wanna have fun').printer.fields.name).toBe('test')
    expect(log.fields.name).toBe('test')
  })
})
