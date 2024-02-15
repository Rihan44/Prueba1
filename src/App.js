import './App.css';
import styled from "styled-components";
import { Events } from './components/Events/Events';
import { Calendario } from './components/Calendar/Calendario';
import { useState } from 'react';

function App() {

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

  const [fechaSeleccionada, setFechaSeleccionada] = useState(formatDate(new Date));
  const [isEvent, setIsEvent] = useState(false);
  const [eventos, setEventos] = useState([]);

  return (
    <>
      <Container>
        <Calendario setFechaSeleccionada={setFechaSeleccionada} />
        <Events fecha={fechaSeleccionada} setIsEvent={setIsEvent} setEventos={setEventos}/>
      </Container>
      {isEvent ? 
      eventos.map((dataEvento) => (
        <ParrafoEvento key={dataEvento.event_id}>Inscrito en evento de {dataEvento.title} con fecha: {dataEvento.date}</ParrafoEvento>
      ))
      : <ParrafoEvento>No estás inscrito a ningún evento aún!</ParrafoEvento>}
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

const ParrafoEvento = styled.p`
  background-color: lightblue;
  width: 30%;
  margin: 0 auto;
  margin-top: 20px;
  height: 20px;
  text-align: center;
  padding: 10px;
`;

export default App;
