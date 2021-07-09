import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

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
      throw new Error('Specification already exists!')
    }

    await this.specficationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
