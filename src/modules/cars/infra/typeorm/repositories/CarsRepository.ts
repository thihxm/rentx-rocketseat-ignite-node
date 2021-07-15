import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    brand,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate })
    return car
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('cars')
      .where('cars.available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('cars.brand = :brand', { brand })
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id })
    }

    if (name) {
      carsQuery.andWhere('cars.name = :name', { name })
    }

    const cars = await carsQuery.getMany()
    return cars
  }
}

export { CarsRepository }
