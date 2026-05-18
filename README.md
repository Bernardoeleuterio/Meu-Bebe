# Meu-Bebe

Meu-Bebe é um aplicativo web em React para acompanhar os cuidados e o desenvolvimento do bebê. A aplicação permite registrar fraldas, sono e amamentação, além de exibir um histórico de atividades e informações básicas do bebê.

## Recursos

- Autenticação simples com login e cadastro de usuários.
- Registro de atividades do bebê:
  - Fraldas
  - Sono
  - Amamentação
- Histórico de registros ordenado por data.
- Edição e exclusão de registros existentes.
- Interface em React com Material UI.
- Dados armazenados localmente no navegador via `localStorage`.

## Tecnologias usadas

- React 19
- React Router DOM 7
- Material UI
- i18next / react-i18next
- LocalStorage para persistência de dados

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto:

```bash
npm start
```

3. Abra no navegador:

```text
http://localhost:3000
```

## Estrutura principal

- `src/App.js` - define as rotas da aplicação
- `src/views/` - páginas principais como Login, Register, Home, Formulário e Settings
- `src/services/storageService.js` - manipulação de dados no `localStorage`
- `src/components/AppBar.js` - barra de navegação personalizada

## Uso

1. Crie uma conta ou faça login.
2. Adicione registros de fralda, sono ou amamentação.
3. Visualize o histórico e edite registros quando necessário.
4. Acompanhe informações do bebê, como nome, peso e tamanho.

## Para descrição do GitHub

App React para acompanhamento de cuidados do bebê: login, cadastro, histórico de fraldas, sono e amamentação com dados salvos no navegador.
