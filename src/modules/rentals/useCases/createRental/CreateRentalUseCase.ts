import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepsitory'
import { AppError } from '@shared/errors/AppError'

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalTimeInHours = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentByCar(
      car_id
    )

    if (carUnavailable) {
      throw new AppError('Car is not available')
    }

    const userWithOpenRent = await this.rentalsRepository.findOpenRentByUser(
      user_id
    )

    if (userWithOpenRent) {
      throw new AppError('There is already an open rent for the user')
    }

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format()

    const currentDate = dayjs().utc().local().format()
    const timeDifference = dayjs(expectedReturnDateFormat).diff(
      currentDate,
      'hours'
    )

    if (timeDifference < minimumRentalTimeInHours) {
      throw new AppError('Invalid return time')
    }
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    return rental
  }
}

export { CreateRentalUseCase }
