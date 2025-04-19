const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2/promise');
const cors = require('cors');

interface CountResult {
  count: number;
}

interface Book {
  id: number;
  name: string;
  abbrev: string;
  testament_id: number;
}

interface Verse {
  id: number;
  version: string;
  chapter: number;
  verse: number;
  text: string;
  book_id: number;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Configuração do MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'public',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Teste de conexão
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    
    // Testar se consegue acessar as tabelas
    const [testaments] = await connection.query('SELECT COUNT(*) as count FROM testaments');
    const [books] = await connection.query('SELECT COUNT(*) as count FROM books');
    const [verses] = await connection.query('SELECT COUNT(*) as count FROM verses');
    
    console.log('Contagem de registros:');
    console.log('- Testamentos:', testaments[0].count);
    console.log('- Livros:', books[0].count);
    console.log('- Versículos:', verses[0].count);
    
    connection.release();
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
}

// Executar teste de conexão antes de iniciar o servidor
testConnection();

// API Endpoints
app.get('/api/books', async (req: any, res: any) => {
  console.log('Requisição recebida em /api/books');
  try {
    const [rows] = await pool.query('SELECT * FROM books ORDER BY testament_id, id');
    console.log('Livros encontrados:', rows.length);
    res.json(rows as Book[]);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/books/:bookId/chapters', async (req: any, res: any) => {
  console.log('Requisição recebida em /api/books/:bookId/chapters', req.params);
  try {
    const { bookId } = req.params;
    const [rows] = await pool.query(
      'SELECT DISTINCT chapter FROM verses WHERE book_id = ? ORDER BY chapter',
      [bookId]
    );
    const chapters = (rows as { chapter: number }[]).map(row => row.chapter);
    console.log('Capítulos encontrados:', chapters.length);
    res.json(chapters);
  } catch (error) {
    console.error('Erro ao buscar capítulos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/books/:bookId/chapters/:chapter/verses', async (req: any, res: any) => {
  console.log('Requisição recebida em /api/books/:bookId/chapters/:chapter/verses', req.params);
  try {
    const { bookId, chapter } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM verses WHERE book_id = ? AND chapter = ? ORDER BY verse',
      [bookId, chapter]
    );
    console.log('Versículos encontrados:', rows.length);
    res.json(rows as Verse[]);
  } catch (error) {
    console.error('Erro ao buscar versículos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// WebSocket
io.on('connection', (socket: any) => {
  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  socket.on('verse-update', (data: any) => {
    console.log('Versículo atualizado:', data);
    // Broadcast para todos os clientes exceto o que enviou
    socket.broadcast.emit('verse-update', data);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 