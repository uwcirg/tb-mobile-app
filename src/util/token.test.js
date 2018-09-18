import {
  getToken,
  getExpiration,
  hasToken,
  setToken,
  removeToken
} from './token'

const now = Date.now()

beforeAll(() => {
  jest.spyOn(Date, 'now').mockImplementation(() => now)
})

afterAll(() => {
  jest.restoreAllMocks()
})

beforeEach(() => {
  localStorage.clear()
})

test('empty localStorage returns null for token', () => {
  expect(getToken()).toBeNull()
})

test('empty localStorage returns null for expiration', () => {
  expect(getExpiration()).toBeNull()
})

test('empty localStorage has no token', () => {
  expect(hasToken()).toBeFalsy()
})

test('localStorage returns token after setting it', () => {
  expect(getToken()).toBeNull()
  setToken('token', null)
  expect(getToken()).toBe('token')
})

test('localStorage returns expiration after setting it', () => {
  expect(getExpiration()).toBeNull()
  setToken('token', now)
  expect(getExpiration()).toBe(now)
})

test('localStorage has token after setting it', () => {
  expect(hasToken()).toBeFalsy()
  setToken('token', null)
  expect(hasToken()).toBeTruthy()
})

test('localStorage returns null for token after removing it', () => {
  setToken('token', null)
  expect(getToken()).toBe('token')
  removeToken()
  expect(getToken()).toBeNull()
})

test('localStorage returns null for expiration after removing it', () => {
  setToken('token', now)
  expect(getExpiration()).toBe(now)
  removeToken()
  expect(getToken()).toBeNull()
})

test('localStorage has no token after removing it', () => {
  setToken('token', null)
  expect(hasToken()).toBeTruthy()
  removeToken()
  expect(hasToken()).toBeFalsy()
})

test('localStorage returns token after setting it when not expired', () => {
  expect(getToken()).toBeNull()
  setToken('token', now + 1)
  expect(getToken()).toBe('token')
})

test('localStorage returns null for token after setting it when expired', () => {
  expect(getToken()).toBeNull()
  setToken('token', now)
  expect(getToken()).toBeNull()
})
