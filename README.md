# Cadastro de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**Regra de Negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado como dispoível por padrão.
O usuário responsável pelo cadastro dever ser um usuário administrador.


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
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

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
