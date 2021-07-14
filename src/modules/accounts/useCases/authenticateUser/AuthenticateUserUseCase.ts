import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

// import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IReponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IReponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    const token = sign({}, 'supertokenseguro', {
      subject: user.id,
      expiresIn: '1d',
    })

    const tokenReturn: IReponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    }

    return tokenReturn
  }
}
export { AuthenticateUserUseCase }
