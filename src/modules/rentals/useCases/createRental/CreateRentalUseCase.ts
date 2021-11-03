import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepsitory'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

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

    const currentDate = this.dateProvider.currentDate()
    const differenceInHours = this.dateProvider.compareInHours(
      currentDate,
      expected_return_date
    )

    if (differenceInHours < minimumRentalTimeInHours) {
      throw new AppError('Invalid return time')
    }
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailability(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }
