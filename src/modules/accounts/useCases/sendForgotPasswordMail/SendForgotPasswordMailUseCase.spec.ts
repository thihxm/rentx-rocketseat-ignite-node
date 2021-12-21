import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory'
import { AppError } from '@shared/errors/AppError'

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail')

    await usersRepositoryInMemory.create({
      driver_license: '1skjasd',
      email: 'user@mail.com',
      name: 'Teste',
      password: '12345',
    })

    await sendForgotPasswordMailUseCase.execute('user@mail.com')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('not-registered@mail.com')
    ).rejects.toEqual(new AppError('User does not exist!'))
  })

  it('should be able to create an users token', async () => {
    const generatedTokenMail = spyOn(usersRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      driver_license: 'aaaad123909j',
      email: 'user2@mail.com',
      name: 'Teste 2',
      password: '123456',
    })

    await sendForgotPasswordMailUseCase.execute('user2@mail.com')

    expect(generatedTokenMail).toHaveBeenCalled()
  })
})
