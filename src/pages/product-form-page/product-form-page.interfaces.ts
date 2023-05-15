export enum PRODUCT_HTTP_STATUS {
  CREATED = 201,
  ERROR_SERVER = 500
}

export type ProductFormInputs = {
  name: string
  size: string
  type: string
}

export type ProductFormResponse = {
  message: string
}

export type ProductFormErrorMessages = {
  [key: string]: string
}
