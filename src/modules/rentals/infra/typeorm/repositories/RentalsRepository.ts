import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepsitory'

import { Rental } from '../entities/Rental'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentByCar(car_id: string): Promise<Rental> {
    const openRentalByCar = await this.repository.findOne({ car_id })
    return openRentalByCar
  }

  async findOpenRentByUser(user_id: string): Promise<Rental> {
    const openRentalByUser = await this.repository.findOne({ user_id })
    return openRentalByUser
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    await this.repository.save(rental)

    return rental
  }
}

export { RentalsRepository }
