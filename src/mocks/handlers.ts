import { baseUrl } from '@/config'
import {
  PRODUCT_HTTP_STATUS,
  ProductFormInputs
} from '@/pages/product-form-page/product-form-page.interfaces'
import { rest } from 'msw'

export const handlers = [
  rest.post(`${baseUrl}/login`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json({ token: '123' }))
  }),

  rest.post(`${baseUrl}/products`, async (req, res, ctx) => {
    const transformersBase = [ctx.delay()]

    const { name, size, type } = await req.json<ProductFormInputs>()

    if (name && size && type)
      return res(
        ...transformersBase,
        ctx.status(PRODUCT_HTTP_STATUS.CREATED),
        ctx.json({ id: 1 })
      )

    return res(
      ...transformersBase,
      ctx.status(PRODUCT_HTTP_STATUS.ERROR_SERVER)
    )
  })
]
