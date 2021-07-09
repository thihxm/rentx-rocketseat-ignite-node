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

  execute({ name, description }: IRequest): void {
    const specification = this.specficationsRepository.findByName(name)

    if (specification) {
      throw new Error('Specification already exists!')
    }

    this.specficationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
