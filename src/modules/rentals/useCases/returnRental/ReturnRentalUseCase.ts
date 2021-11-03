import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepsitory'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { rentalsRoutes } from '@shared/infra/http/routes/rentals.routes'

interface IRequest {
  id: string
  user_id: string
}

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)
    const minimumDaily = 1

    if (!rental) {
      throw new AppError('Rental does not exist')
    }

    const currentDate = this.dateProvider.currentDate()
    let numOfDailies = this.dateProvider.compareInDays(
      rental.start_date,
      currentDate
    )

    if (numOfDailies <= 0) {
      numOfDailies = minimumDaily
    }

    const delayInDays = this.dateProvider.compareInDays(
      currentDate,
      rental.expected_return_date
    )

    let total = 0

    if (delayInDays > 0) {
      const calculatedFine = delayInDays * car.fine_amount
      total = calculatedFine
    }

    total += numOfDailies * car.daily_rate

    rental.end_date = currentDate
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailability(car.id, true)

    return rental
  }
}

export { ReturnRentalUseCase }
