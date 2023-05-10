import { baseUrl } from '@/config'
import { rest } from 'msw'

export const handlers = [
  rest.post(`${baseUrl}/login`, (req, res, ctx) => {
    ctx.delay(1)
    res(ctx.status(200))
  })
]
