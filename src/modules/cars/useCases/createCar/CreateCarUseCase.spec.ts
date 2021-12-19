import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Test Car',
      description: 'Description Test Car',
      daily_rate: 100,
      license_plate: 'ABC-0A12',
      fine_amount: 50,
      brand: 'Test Brand',
      category_id: 'category',
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with existing license plate', async () => {
    await createCarUseCase.execute({
      name: 'Test Car 1',
      description: 'Description Test Car 1',
      daily_rate: 100,
      license_plate: 'ABC-0A12',
      fine_amount: 50,
      brand: 'Test Brand',
      category_id: 'category',
    })

    await expect(
      createCarUseCase.execute({
        name: 'Test Car 2',
        description: 'Description Test Car 2',
        daily_rate: 120,
        license_plate: 'ABC-0A12',
        fine_amount: 60,
        brand: 'Test Brand 2',
        category_id: 'category 2',
      })
    ).rejects.toEqual(new AppError('Car already exists'))
  })

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Available Car',
      description: 'Description Available Car',
      daily_rate: 100,
      license_plate: 'ABC-0A12',
      fine_amount: 50,
      brand: 'Test Brand',
      category_id: 'category',
    })

    expect(car.available).toBe(true)
  })
})
