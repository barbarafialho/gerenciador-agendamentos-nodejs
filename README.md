# Sistema de Agendamentos – Salão de Beleza

Este projeto foi desenvolvido para gerenciar agendamentos de um salão de beleza, permitindo o cadastro de profissionais, serviços e atendimentos, além de organizar as marcações feitas pelas clientes. A aplicação foi construída seguindo uma arquitetura simples e organizada, separando claramente backend e frontend.

## Tecnologias Utilizadas

**Banco de Dados:**

* PostgreSQL hospedado no **Supabase**, possibilitando fácil acesso da equipe no trabalho remoto.
* **Postgres.js** para manipulação das tabelas e execução das consultas de forma performática.

**Backend:**

* **Node.js + Express** para criação da API.
* Estrutura organizada em **models** e **controllers**, garantindo boa manutenção do código.

**Frontend:**

* **Vue.js** para construção da interface e organização das páginas em **views**.
* **Axios** para consumo das rotas da API.

---

## Estrutura do Banco de Dados

A modelagem foi feita para representar o funcionamento de um salão de beleza, contemplando as relações entre profissionais, serviços e agendamentos.

### 1. Profissional

* Cada profissional pode realizar vários serviços.
* Relação: **1 profissional → N serviços**.

### 2. Serviço

* Cada serviço pertence a um único profissional.
* Relação: **1 serviço → 1 profissional**.

### 3. Agendamento

* Contém data, hora, nome da cliente e status.
* Um agendamento pode ter vários serviços.
* Um serviço pode estar presente em vários agendamentos.
* Relação: **N:M entre agendamento e serviço**.

### 4. Atendimento

* Tabela intermediária que representa a relação N:M entre agendamento e serviço.
* Cada registro liga um agendamento a um serviço realizado.

---

## Organização do Projeto

### Backend

* Contém as rotas responsáveis por cadastrar profissionais, serviços, agendamentos e atendimentos.
* Utiliza Postgres.js para consultar e inserir dados.
* Controllers gerenciam a lógica e delegam as interações com os models.

### Frontend

* Construído em Vue.js, com páginas organizadas em views.
* Axios é usado para requisições à API.
* Permite visualizar profissionais, serviços e realizar novos agendamentos.

---

## Como Executar o Projeto

### Backend

1. Instale as dependências:

   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente para conexão com o banco do Supabase.
3. Inicie o servidor:

   ```bash
   npm start
   ```

### Frontend

1. Acesse a pasta do frontend e instale as dependências:

   ```bash
   npm install
   ```
2. Execute o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

---

## Objetivo Geral

Fornecer uma solução simples e funcional para gerenciar agendamentos em um salão de beleza, facilitando a visualização de horários, serviços disponíveis e profissionais responsáveis.

---

## Status do Projeto

Em desenvolvimento, com integração completa entre backend e frontend, e estrutura pronta para evolução futura.
