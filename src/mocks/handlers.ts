import { rest } from 'msw'

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    ctx.delay(1)
    res(ctx.status(200))
  })
]
