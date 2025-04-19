import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { socket } from '../services/socket';
import { Verse } from '../types';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: white;
  padding: 3rem;
  font-family: 'Playfair Display', serif;
`;

const Content = styled.div`
  text-align: center;
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const VerseText = styled.p`
  font-size: 4.5rem;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.02em;

  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Reference = styled.div`
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 2rem;
  font-style: italic;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 1200px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const WaitingMessage = styled(VerseText)`
  color: rgba(255, 255, 255, 0.6);
`;

interface DisplayData {
  verse: Verse;
  reference: string;
}

function Display() {
  const [displayData, setDisplayData] = useState<DisplayData | null>(null);

  useEffect(() => {
    function onVerseUpdate(data: DisplayData) {
      setDisplayData(data);
    }

    socket.on('verse-update', onVerseUpdate);

    return () => {
      socket.off('verse-update', onVerseUpdate);
    };
  }, []);

  useEffect(() => {
    // Entrar em modo tela cheia ao carregar
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }, []);

  return (
    <Container>
      <Content>
        {displayData ? (
          <>
            <VerseText>{displayData.verse.text}</VerseText>
            <Reference>{displayData.reference}</Reference>
          </>
        ) : (
          <WaitingMessage>Aguardando versículo...</WaitingMessage>
        )}
      </Content>
    </Container>
  );
}

export default Display; 