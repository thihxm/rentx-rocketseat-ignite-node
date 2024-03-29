# Cadastro de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro.

**Regra de Negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado como dispoível por padrão.
* O usuário responsável pelo cadastro dever ser um usuário administrador.


# Listagem de carros

**Requisitos Funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo modelo do carro.

**Regra de Negócio**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação em um carro.

**Regra de Negócio**
Não deve ser possível cadastrar uma especificação em um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente no mesmo carro.
O usuário responsável pelo cadastro dever ser um usuário administrador.

# Cadastro de imagem do carro

**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**Requisitos Não Funcionais**
Utilizar o multer para upload dos arquivos.

**Regra de Negócio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro dever ser um usuário administrador.

# Aluguel de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel.

**Requisitos Não Funcionais**


**Regra de Negócio**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro

**Requisitos Funcionais**
Deve ser possível realizar a devolução de um carro

**Requisitos Não Funcionais**

**Regra de Negócio**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação

# Listagem de Aluguéis para usuário

**Requisitos Funcionais**
Deve ser possível realizar a busca de todos os aluguéis para o usuário

**Requisitos Não Funcionais**

**Regra de Negócio**
O usuário deve estar logado na aplicação