import matchers from '@testing-library/jest-dom/matchers'
import { afterAll, afterEach, beforeAll, beforeEach, expect } from 'vitest'

import { queryClient } from '../src/mocks/render-with-providers'
import { server } from '../src/mocks/server'

expect.extend(matchers)

beforeEach(() => queryClient.clear())

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
