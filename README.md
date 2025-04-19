# 📖 Bíblia Online para Projeção

Sistema web para projeção de versículos bíblicos em igrejas, desenvolvido com React, Node.js e MySQL.

## 📸 Screenshots

### Painel de Controle
![Painel de Controle](https://i.imgur.com/VYG3CnC.png)

### Tela de Projeção
![Tela de Projeção](https://i.imgur.com/K5e5g3P.png)

## ✨ Características

- 🎯 Interface simples e intuitiva
- 📱 Design responsivo
- 🖥️ Tela de controle separada da tela de projeção
- 🔄 Atualização em tempo real via WebSocket
- 📚 Bíblia completa em português (NVI)
- 🎨 Design elegante e minimalista
- 🌙 Modo escuro para melhor visualização
- 🖼️ Modo tela cheia automático na tela de projeção
- 🚀 Inicialização com um clique via arquivo .bat

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - React 18
  - TypeScript
  - Styled Components
  - React Router DOM
  - Socket.io Client

- **Backend:**
  - Node.js
  - Express
  - Socket.io
  - MySQL2

- **Banco de Dados:**
  - MySQL

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (via XAMPP ou instalação standalone)
- NPM ou Yarn

## 🚀 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/IsraelSilva99/biblia-online
   cd biblia-online
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   - Inicie o MySQL (via XAMPP ou serviço)
   - Acesse o phpMyAdmin (http://localhost/phpmyadmin)
   - Execute o arquivo `data.sql` para inserir os dados da Bíblia

4. **Inicie o sistema:**
   
   Há duas formas de iniciar o sistema:

   **Forma Simples (Recomendada):**
   - Dê um duplo clique no arquivo `start.bat`
   - O script vai:
     1. Verificar se o MySQL está rodando
     2. Iniciar o servidor backend
     3. Iniciar o frontend
     4. Abrir o navegador automaticamente
     5. Mostrar as URLs de acesso

   **Forma Manual:**
   - Em um terminal: `npm run server`
   - Em outro terminal: `npm start`

## 🖥️ Como Usar

1. **Painel de Controle (http://localhost:3000)**
   - Selecione o livro da Bíblia
   - Escolha o capítulo
   - Selecione o versículo
   - Visualize o preview do versículo
   - Clique em "Abrir Tela de Exibição" para a tela do projetor

2. **Tela de Exibição (http://localhost:3000/display)**
   - Abra em uma nova janela/monitor
   - Entrará automaticamente em modo tela cheia
   - Mostrará o versículo selecionado em tempo real
   - Design otimizado para projeção

## 📁 Estrutura do Projeto

```
biblia-online/
├── public/               # Arquivos estáticos
├── server/              # Código do servidor
├── src/                 # Código fonte React
│   ├── pages/          # Componentes de página
│   ├── services/       # Serviços (WebSocket)
│   └── types/          # Tipagens TypeScript
├── data.sql            # Dados da Bíblia
├── setup.sql           # Configuração do banco
└── package.json        # Dependências
```

## ⚙️ Configuração

### Banco de Dados
O arquivo `server/index.ts` contém as configurações do banco:
```typescript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'public',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```