import { useEffect, useState } from "react";
import styled from "styled-components";

export const Events = ({fecha, setIsEvent, setEventos}) => {

    const [data, setData] = useState([]);

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

    const handleEvent = (data) => {
        setIsEvent(true);
        setEventos(prevEventos => [...prevEventos, data])
    }

    return(
        <ContainerEvents>
            <Title>Próximos Eventos</Title>
            <Eventos>

            {data
                .filter(dataJson => dataJson.date === fecha)
                .map(dataJson => (
                    <EventBox key={dataJson.event_id}>
                        <p>{dataJson.title}</p>
                        <p>{dataJson.date}</p>
                        <ButtonEvent onClick={() => handleEvent(dataJson)}>INSCRIBIRSE</ButtonEvent>
                    </EventBox>
                ))
            }
            </Eventos>
                        
        </ContainerEvents>
    )

}

const ContainerEvents = styled.div`
    width: 75%;
    height: 250px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-left: 20px;
`;

const Title = styled.h2`
    color: #3ccaf2;
`;

const Eventos = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
`;

const EventBox = styled.div`
    display: flex;
    margin: 10px;
    flex-direction: column;
    width: 200px;
    height: 150px;
    border-radius: 5px;
    font-family: 'Verdana';
    font-size: 14px;
    align-items: center;
    background-color: lightblue;
    text-align: center;

    p {
        margin: 10px;
    }
`;

const ButtonEvent = styled.button`
    border: none;
    background-color: #2b65ad;
    padding: 10px;
    color: white;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.3s;


    &:hover {
        background-color: aquamarine;
    }
`;
