import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'

import upload from '@config/upload'
import { AppError } from '@shared/errors/AppError'
import { router } from '@shared/infra/http/routes'
import createConnection from '@shared/infra/typeorm'

import swaggerFile from '../../../swagger.json'
import '@shared/container'

createConnection()
const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(cors())

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${upload.tmpFolder}/cars`))

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

export { app }
