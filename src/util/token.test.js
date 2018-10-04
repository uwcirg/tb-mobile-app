import {
  getToken,
  getExpiration,
  hasToken,
  setToken,
  removeToken
} from './token'
const now = Date.now()

import LocalStorageMock from "../test_utils/LocalStorageMock"
global.localStorage = new LocalStorageMock()

beforeAll(() => {
  jest.spyOn(Date, 'now').mockImplementation(() => now)
})

afterAll(() => {
  jest.restoreAllMocks()
})

beforeEach(() => {
  localStorage.clear()
})

describe("getToken()", () => {
  test('starts as null', () => {
    expect(getToken()).toBeNull()
  })

  test('returns token after setting it', () => {
    setToken('token', now + 1)
    expect(getToken()).toBe('token')
  })

  test('returns null for token after removing it', () => {
    setToken('token', now + 1)
    expect(getToken()).toBe('token')

    removeToken()
    expect(getToken()).toBeNull()
  })

  test('returns token after setting it when not expired', () => {
    setToken('token', now + 1)
    expect(getToken()).toBe('token')
  })

  test('returns null for token after setting it when expired', () => {
    setToken('token', now)
    expect(getToken()).toBeNull()
  })
})

describe("hasToken()", () => {
  test('starts as false', () => {
    expect(hasToken()).toBeFalsy()
  })

  test('returns true after setting token', () => {
    expect(hasToken()).toBeFalsy()
    setToken('token', now + 1)
    expect(hasToken()).toBeTruthy()
  })

  test('returns false after removing token', () => {
    setToken('token', now + 1)
    expect(hasToken()).toBeTruthy()

    removeToken()
    expect(hasToken()).toBeFalsy()
  })
})

describe("getExpiration()", () => {
  test('starts as null', () => {
    expect(getExpiration()).toBeNull()
  })

  test('returns expiration after setting it', () => {
    expect(getExpiration()).toBeNull()
    setToken('token', now)
    expect(getExpiration()).toBe(now)
  })

  test('returns null after removing token', () => {
    setToken('token', now)
    expect(getExpiration()).toBe(now)

    removeToken()
    expect(getExpiration()).toBeNull()
  })
})
