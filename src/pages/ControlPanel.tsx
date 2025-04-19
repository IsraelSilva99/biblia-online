import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { socket } from '../services/socket';
import { Book, Verse } from '../types';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: white;
  font-family: 'Playfair Display', serif;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const DisplayLink = styled.a`
  color: #4a9eff;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #4a9eff;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4a9eff;
    color: white;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Select = styled.select`
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 250px;
  cursor: pointer;
  font-family: 'Playfair Display', serif;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  option {
    background-color: #2a2a2a;
    color: white;
  }
`;

const Preview = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 3rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PreviewText = styled.p`
  font-size: 2.2rem;
  line-height: 1.6;
  text-align: center;
  margin: 0;
  font-weight: 500;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Reference = styled.div`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1.5rem;
  text-align: center;
  font-style: italic;
`;

function ControlPanel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<number>(0);
  const [chapters, setChapters] = useState<number[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);

  // Carregar livros ao iniciar
  useEffect(() => {
    console.log('Carregando livros...');
    fetch('http://localhost:3001/api/books')
      .then(res => res.json())
      .then(data => {
        console.log('Livros carregados:', data);
        setBooks(data);
      })
      .catch(error => console.error('Erro ao carregar livros:', error));
  }, []);

  // Carregar capítulos quando um livro é selecionado
  useEffect(() => {
    if (selectedBook) {
      console.log('Carregando capítulos do livro:', selectedBook);
      fetch(`http://localhost:3001/api/books/${selectedBook}/chapters`)
        .then(res => res.json())
        .then(data => {
          console.log('Capítulos carregados:', data);
          setChapters(data);
          setSelectedChapter(1);
        })
        .catch(error => console.error('Erro ao carregar capítulos:', error));
    }
  }, [selectedBook]);

  // Carregar versículos quando um capítulo é selecionado
  useEffect(() => {
    if (selectedBook && selectedChapter) {
      console.log('Carregando versículos do capítulo:', selectedChapter);
      fetch(`http://localhost:3001/api/books/${selectedBook}/chapters/${selectedChapter}/verses`)
        .then(res => res.json())
        .then(data => {
          console.log('Versículos carregados:', data);
          setVerses(data);
          setSelectedVerse(data[0] || null);
        })
        .catch(error => console.error('Erro ao carregar versículos:', error));
    }
  }, [selectedBook, selectedChapter]);

  // Enviar versículo selecionado para a tela de exibição
  useEffect(() => {
    if (selectedVerse) {
      const currentBook = books.find(b => b.id === selectedBook);
      socket.emit('verse-update', {
        verse: selectedVerse,
        reference: `${currentBook?.name} ${selectedChapter}:${selectedVerse.verse}`
      });
    }
  }, [selectedVerse, selectedBook, selectedChapter, books]);

  return (
    <Container>
      <Header>
        <Title>Painel de Controle - Bíblia Online</Title>
        <DisplayLink href="/display" target="_blank">
          Abrir Tela de Exibição ↗
        </DisplayLink>
      </Header>

      <Controls>
        <Select 
          value={selectedBook} 
          onChange={(e) => setSelectedBook(Number(e.target.value))}
        >
          <option value={0}>Selecione o Livro</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </Select>

        <Select 
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(Number(e.target.value))}
          disabled={!selectedBook}
        >
          <option value={0}>Selecione o Capítulo</option>
          {chapters.map(chapter => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </Select>

        <Select 
          value={selectedVerse?.verse || 0}
          onChange={(e) => {
            const verse = verses.find(v => v.verse === Number(e.target.value));
            setSelectedVerse(verse || null);
          }}
          disabled={!selectedChapter}
        >
          <option value={0}>Selecione o Versículo</option>
          {verses.map(verse => (
            <option key={verse.verse} value={verse.verse}>
              {verse.verse}
            </option>
          ))}
        </Select>
      </Controls>

      <Preview>
        {selectedVerse ? (
          <>
            <PreviewText>{selectedVerse.text}</PreviewText>
            <Reference>
              {books.find(b => b.id === selectedBook)?.name} {selectedChapter}:{selectedVerse.verse}
            </Reference>
          </>
        ) : (
          <PreviewText>Selecione um versículo para começar</PreviewText>
        )}
      </Preview>
    </Container>
  );
}

export default ControlPanel; 