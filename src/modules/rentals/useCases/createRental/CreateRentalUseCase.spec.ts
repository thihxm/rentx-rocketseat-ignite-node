import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/InMemory/RentalsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '1212121',
      expected_return_date: new Date(),
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if the user has an open rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '1212121',
        expected_return_date: new Date(),
      })

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '554321',
        expected_return_date: new Date(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if the car has an open rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '33333',
        expected_return_date: new Date(),
      })

      await createRentalUseCase.execute({
        user_id: '321',
        car_id: '33333',
        expected_return_date: new Date(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
