import matchers from '@testing-library/jest-dom/matchers'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { server } from '../src/mocks/server'

expect.extend(matchers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
