import dayjs from 'dayjs'

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/InMemory/RentalsRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
  const tomorrow = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '1212121',
      expected_return_date: tomorrow,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if the user has an open rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '1212121',
        expected_return_date: tomorrow,
      })

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '554321',
        expected_return_date: tomorrow,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if the car has an open rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '33333',
        expected_return_date: tomorrow,
      })

      await createRentalUseCase.execute({
        user_id: '321',
        car_id: '33333',
        expected_return_date: tomorrow,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '33333',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
