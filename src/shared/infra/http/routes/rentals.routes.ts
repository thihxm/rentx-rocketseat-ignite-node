import { Router } from 'express'

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'
import { ReturnRentalController } from '@modules/rentals/useCases/returnRental/ReturnRentalController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const returnRentalController = new ReturnRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)

rentalsRoutes.post(
  '/return/:id',
  ensureAuthenticated,
  returnRentalController.handle
)

rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
)

export { rentalsRoutes }
