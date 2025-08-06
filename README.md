
# 🧪 Projeto de Prática: Backend-for-Frontend (BFF) com Angular + Nitro + PocketBase

Este repositório demonstra a aplicação do padrão **Backend-for-Frontend (BFF)** em um cenário prático, usando:

- ⚙️ **Frontend Angular**
- 🌐 **Backend-for-Frontend (BFF) com Nitro**
- 💾 **PocketBase** (banco de dados leve com REST API integrada)

> 🎯 O objetivo é exercitar a separação de responsabilidades, segurança e estrutura escalável ao integrar frontend e backend via uma camada intermediária (BFF).

---

## 📁 Estrutura do Projeto

### Back-for-Frontend-practice/
<br>
├── frontend-angular      # Aplicação Angular (interface do usuário)
<br>
├── bff-nitro             # Backend-for-Frontend com Nitro
<br>
├── pb_data/              # Dados utilizados pelo PocketBase
<br>
└── db.json               # Fixture inicial do banco de dados

---

## 🚀 Instruções para rodar o projeto localmente

1. Clone o repositório

git clone https://github.com/dougaandrade/Back-for-Frontend-practice.git
cd Back-for-Frontend-practice

2. Instale as dependências

# Instalar dependências do Angular
cd frontend-angular
npm install

# Instalar dependências do BFF
cd ../bff-nitro
npm install

3. Inicie os serviços

# Iniciar PocketBase
npx pocketbase serve --dir ../pb_data

# Em outro terminal: iniciar o BFF
cd bff-nitro
npm run dev

# Em outro terminal: iniciar o frontend Angular
cd ../frontend-angular
npm run start

4. Acesse no navegador

Frontend:     http://localhost:4200
BFF (Nitro):  http://localhost:3000

---

## ⚙️ Tecnologias Utilizadas

Camada        | Tecnologia         
--------------|--------------------
Frontend      | Angular 17         
BFF           | Nitro (Nitro Server)
Banco de dados| PocketBase         
Comunicação   | HTTP/REST via BFF  

---

## 🔄 Como funciona a arquitetura

[ Angular ] → [ BFF (Nitro) ] → [ PocketBase ]

- O frontend **nunca se comunica diretamente com o PocketBase**.
- O **BFF** filtra, formata, valida e protege os dados antes de entregá-los ao cliente.
- O **PocketBase** atua como banco de dados + API REST leve e rápido.

---

## 📌 Funcionalidades principais

- ✅ Exibição de dados (“painéis”) armazenados no PocketBase
- 🔐 Proteção de dados via BFF
- 🧼 Lógica de apresentação concentrada no frontend, lógica de negócio no BFF
- 🧪 Projeto modular para testar facilmente outras APIs/BFFs

---

## 📂 Principais arquivos

Local                                | Descrição
-------------------------------------|-----------
frontend-angular/src/app/services    | Serviços para consumir dados do BFF
bff-nitro/server/api                 | Rotas que o BFF expõe para o frontend
db.json                              | Dados base da aplicação

---

## 🧪 Sugestões de melhorias futuras

- Autenticação com JWT/OAuth
- Cache de dados no BFF
- Validações com Zod ou Yup no backend
- Testes automatizados (unitários e de integração)
- Deploy com Docker + CI/CD

---

## 🧠 Por que usar BFF?

O padrão **Backend-for-Frontend (BFF)**:

- 📱 Adapta respostas para diferentes clientes (web, mobile)
- 🔒 Protege endpoints e dados sensíveis
- ⚙️ Centraliza regras de negócio
- 🔄 Reduz acoplamento entre frontend e serviços backend

Leia mais:  
BFF: Backend for Frontend – Bits and Pieces: https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf

---

## 🤝 Contribuição

Sinta-se livre para:

- Abrir **issues**
- Enviar **pull requests**
- Criar forks e adaptar o projeto

---

## 📄 Licença

Este projeto é open-source, disponível sob a licença MIT.

---

## 📄 Creators

👾 Vinicius Dias (https://github.com/ViniDias1)
<br>
👾 Douglas Andrade (https://github.com/dougaandrade)

---
