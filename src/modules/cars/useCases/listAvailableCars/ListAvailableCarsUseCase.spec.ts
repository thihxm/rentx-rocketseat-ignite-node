import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car 1 description',
      daily_rate: 100,
      license_plate: 'AAA-0A00',
      fine_amount: 80,
      brand: 'Car Brand',
      category_id: 'category 1',
    })

    /* TODO - Add a car that is not available */
    // await carsRepositoryInMemory.create({
    //   name: 'Car Not Available',
    //   description: 'Car Not Available Description',
    //   daily_rate: 200,
    //   license_plate: 'AAA-0A00',
    //   fine_amount: 130,
    //   brand: 'Car Brand',
    //   category_id: 'category 2',
    // })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car 2 Description',
      daily_rate: 100,
      license_plate: 'BBB-0B00',
      fine_amount: 80,
      brand: 'Car Brand',
      category_id: 'category 1',
    })

    await carsRepositoryInMemory.create({
      name: 'Different Car 1',
      description: 'Different Car 1 Description',
      daily_rate: 200,
      license_plate: 'BBB-0B01',
      fine_amount: 130,
      brand: 'Car Brand',
      category_id: 'different category 1',
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car 2',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 3',
      description: 'Car 3 Description',
      daily_rate: 100,
      license_plate: 'CCC-0C00',
      fine_amount: 80,
      brand: 'Car Brand',
      category_id: 'category 1',
    })

    await carsRepositoryInMemory.create({
      name: 'Different Car 2',
      description: 'Different Car 2 Description',
      daily_rate: 200,
      license_plate: 'CCC-0C01',
      fine_amount: 130,
      brand: 'Car Brand 2',
      category_id: 'different category 2',
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car Brand',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 4',
      description: 'Car 4 Description',
      daily_rate: 100,
      license_plate: 'DDD-0D00',
      fine_amount: 80,
      brand: 'Car Brand',
      category_id: 'category 4',
    })

    await carsRepositoryInMemory.create({
      name: 'Different Car 3',
      description: 'Different Car 3 Description',
      daily_rate: 200,
      license_plate: 'BBB-0B01',
      fine_amount: 130,
      brand: 'Car Brand',
      category_id: 'different category 3',
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category 4',
    })

    expect(cars).toEqual([car])
  })
})
