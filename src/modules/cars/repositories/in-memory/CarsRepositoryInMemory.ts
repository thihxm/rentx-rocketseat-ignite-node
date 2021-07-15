import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    id,
    brand,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      id,
      brand,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      specifications,
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available === true)

    if (brand) {
      cars = cars.filter((car) => car.brand === brand)
    }
    if (category_id) {
      cars = cars.filter((car) => car.category_id === category_id)
    }
    if (name) {
      cars = cars.filter((car) => car.name === name)
    }

    return cars
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id)
  }
}

export { CarsRepositoryInMemory }
