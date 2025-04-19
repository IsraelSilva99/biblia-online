# 📖 Bíblia Online para Projeção

Sistema web para projeção de versículos bíblicos em igrejas, desenvolvido com React, Node.js e MySQL.

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

### Portas
- Frontend: 3000
- Backend: 3001

## 🔧 Desenvolvimento

Para contribuir com o projeto:

1. Crie um fork
2. Crie uma branch para sua feature (`git checkout -b feature/nome`)
3. Commit suas mudanças (`git commit -m 'Adiciona feature'`)
4. Push para a branch (`git push origin feature/nome`)
5. Abra um Pull Request

## 📝 Notas

- O sistema usa a versão NVI da Bíblia
- O modo tela cheia funciona melhor em navegadores modernos
- Recomendado usar Chrome ou Firefox para melhor compatibilidade

## 🐛 Problemas Conhecidos

- O modo tela cheia pode precisar de permissão do usuário em alguns navegadores
- Alguns navegadores podem bloquear a entrada automática em tela cheia

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

- 🐛 Reportar bugs
- 💡 Sugerir novas features
- 📝 Melhorar a documentação
- 👨‍💻 Submeter PRs

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

Seu Nome
- GitHub: [@IsraelSilva99](https://github.com/IsraelSilva99)
- LinkedIn: [Israel Silva](https://www.linkedin.com/in/israelsilva99/)

## 🙏 Agradecimentos

- Sociedade Bíblica Internacional pela versão NVI
- Comunidade open source pelas ferramentas utilizadas 