import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specficationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specification = await this.specficationsRepository.findByName(name)

    if (specification) {
      throw new AppError('Specification already exists!')
    }

    await this.specficationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
