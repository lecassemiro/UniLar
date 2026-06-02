# 🏠 UniLar

<div align="center">

### Plataforma de Moradia Universitária

Conectando estudantes a opções de moradia de forma simples, rápida e intuitiva.

![React](https://img.shields.io/badge/React-19-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![MVC](https://img.shields.io/badge/Architecture-MVC-success)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green)

</div>

---

## 📖 Sobre o Projeto

O **UniLar** é uma aplicação web desenvolvida para facilitar a busca e divulgação de moradias voltadas ao público universitário.

A plataforma permite que estudantes encontrem imóveis próximos às suas instituições de ensino, comparem opções, salvem favoritos e entrem em contato diretamente com os anunciantes.

O projeto foi desenvolvido aplicando conceitos de desenvolvimento Front-End moderno, arquitetura MVC, gerenciamento de estado global e boas práticas de componentização utilizando React.

---

## 🎯 Problema Resolvido

Muitos estudantes enfrentam dificuldades para encontrar moradias próximas às universidades, especialmente quando se mudam para outra cidade.

Atualmente as opções disponíveis costumam estar espalhadas entre:

- Grupos de Facebook
- WhatsApp
- Sites genéricos de aluguel
- Indicações informais

O UniLar centraliza essas informações em uma única plataforma focada exclusivamente no ambiente universitário.

---

## ✨ Funcionalidades

### 🔍 Pesquisa Inteligente

- Busca por cidade
- Busca por bairro
- Busca por título do anúncio
- Filtros dinâmicos

### 🏠 Catálogo de Imóveis

- Kitnets
- Quartos
- Apartamentos
- Casas

### ❤️ Sistema de Favoritos

- Adicionar favoritos
- Remover favoritos
- Persistência local

### 📋 Cadastro de Imóveis

- Formulário validado
- Preview do anúncio
- Feedback visual ao usuário

### 👤 Perfil do Usuário

- Edição de perfil
- Estatísticas pessoais
- Histórico de anúncios

### 🔔 Feedback em Tempo Real

- Sistema de Toasts
- Mensagens de sucesso
- Mensagens informativas

---

## 🏗️ Arquitetura

O projeto foi estruturado seguindo o padrão **MVC (Model-View-Controller)** para manter a separação de responsabilidades e facilitar a escalabilidade.

### Model

Responsável pelos dados e regras de negócio.

```text
model/
├── ListingModel.js
└── UserModel.js
```

### View

Responsável pela interface e experiência do usuário.

```text
view/
├── components/
└── pages/
```

### Controller

Responsável pela comunicação entre a View e os Models.

```text
controller/
├── ListingController.js
├── NavigationController.js
└── RegisterController.js
```

---

## 🛠️ Tecnologias Utilizadas

### Front-End

- React
- JavaScript ES6+
- Vite
- Tailwind CSS

### Gerenciamento de Estado

- Context API
- useReducer

### Persistência de Dados

- LocalStorage

### Ferramentas

- Git
- GitHub
- VS Code

---

## 📂 Estrutura do Projeto

```text
src
│
├── context
│   └── AppContext.jsx
│
├── controller
│   ├── ListingController.js
│   ├── NavigationController.js
│   └── RegisterController.js
│
├── model
│   ├── ListingModel.js
│   └── UserModel.js
│
├── view
│   ├── components
│   │   ├── EmptyState.jsx
│   │   ├── FilterChips.jsx
│   │   ├── Navbar.jsx
│   │   ├── PropertyCard.jsx
│   │   └── Toast.jsx
│   │
│   └── pages
│       ├── HomePage.jsx
│       ├── ListingsPage.jsx
│       ├── FavoritesPage.jsx
│       ├── ProfilePage.jsx
│       └── RegisterPage.jsx
│
├── App.jsx
└── main.jsx
```

---

## 🚀 Como Executar

### Clonar o projeto

```bash
git clone https://github.com/lecassemiro/UniLar.git
```

### Entrar na pasta

```bash
cd UniLar
```

### Instalar dependências

```bash
npm install
```

### Executar localmente

```bash
npm run dev
```

### Acessar

```text
http://localhost:5173
```

---

## 💡 Conceitos Aplicados

Durante o desenvolvimento foram aplicados conceitos importantes de engenharia de software:

- Arquitetura MVC
- Componentização
- Estado Global
- Responsividade
- Clean Code
- Separação de Responsabilidades
- Persistência Local
- Validação de Formulários
- Experiência do Usuário (UX)

---

## 📈 Próximas Evoluções

- Backend em Node.js
- Banco de Dados PostgreSQL
- Autenticação JWT
- Upload de Imagens
- Chat entre Locatário e Proprietário
- Integração com Mapas
- Sistema de Avaliações

---

## 👨‍💻 Minha Participação

Responsável pelo desenvolvimento da aplicação utilizando React, aplicando arquitetura MVC, gerenciamento de estado global e construção da interface focada em experiência do usuário.

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos e demonstração de habilidades técnicas.
