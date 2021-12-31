import { NextFunction, Request, Response } from 'express'
import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

import { AppError } from '@shared/errors/AppError'

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  enableOfflineQueue: false,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 5,
})

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip)

    next()
  } catch (error) {
    throw new AppError('Too many requests', 429)
  }
}
