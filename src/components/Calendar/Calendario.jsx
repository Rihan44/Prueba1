import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";

export const Calendario = ({ setFechaSeleccionada }) => {

    const [value, onChange] = useState(new Date());
    const [data, setData] = useState([]);

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }

    const onClickDay = (value) => {
        setFechaSeleccionada(formatDate(value));
    };

    const tileContent = ({date}) => {
        const fechaFormateada = formatDate(date);

        if (data.find(evento => evento.date === fechaFormateada)) {
            return <EventIndicator />;
        }
        return null;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await import("../../Data/prueba.json");
                setData(response.default);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
      <CalendarContainer>
        <Calendar 
            onChange={onChange} 
            value={value} 
            onClickDay={onClickDay}
            tileContent={tileContent}
        />
      </CalendarContainer>
    )
}

const CalendarContainer = styled.div`
    width: 25%;
    margin-top: 40px;
`;

const EventIndicator = styled.div`
    width: 10px;
    height: 10px;
    margin-left: 12px;
    background-color: red;
    border-radius: 50%;
`;