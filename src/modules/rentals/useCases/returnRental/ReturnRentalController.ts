import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ReturnRentalUseCase } from './ReturnRentalUseCase'

class ReturnRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user
    const { id } = req.params
    const returnRentalUseCase = container.resolve(ReturnRentalUseCase)

    const rental = await returnRentalUseCase.execute({
      id,
      user_id,
    })

    return res.status(200).json(rental)
  }
}

export { ReturnRentalController }
