import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationService {
  constructor(private specficationsRepository: ISpecificationsRepository) {}

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

export { CreateSpecificationService }
