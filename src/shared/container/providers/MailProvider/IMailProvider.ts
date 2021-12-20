interface IForgotMailVariables {
  name: string
  link: string
}

interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: IForgotMailVariables,
    path: string
  ): Promise<void>
}

export { IMailProvider, IForgotMailVariables }
