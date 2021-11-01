import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepsitory'
import { AppError } from '@shared/errors/AppError'

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

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    return rental
  }
}

export { CreateRentalUseCase }
