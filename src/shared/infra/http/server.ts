import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'
import 'reflect-metadata'

import { AppError } from '@shared/errors/AppError'
import { router } from '@shared/infra/http/routes'

import swaggerFile from '../../../swagger.json'
import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  })
})

app.listen(3333, () => {
  console.log('Server is running')
})
