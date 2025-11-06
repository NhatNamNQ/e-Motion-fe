import { vi, expect, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
}
vi.stubGlobal('localStorage', localStorageMock)

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
