import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { GET_BUILDINGS, GET_MEETING_ROOMS, GRAPHQL_API } from '../constants';
import './Home.css';
import { TextContainer } from '../components';

export const Container = styled.div`
   {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const Home = () => {
  const [buildings, setBuildings] = useState();
  const [meetingRooms, setMeetingRooms] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuildings();
    fetchMeetingRooms();
  }, []);

  const fetchBuildings = () => {
    axios
      .post(GRAPHQL_API, {
        query: GET_BUILDINGS,
      })
      .then((response) => {
        let data = response.data.data.Buildings;
        setBuildings(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchMeetingRooms = () => {
    axios
      .post(GRAPHQL_API, {
        query: GET_MEETING_ROOMS,
      })
      .then((response) => {
        let data = response.data.data.MeetingRooms;
        setMeetingRooms(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='root'>
      <h2>Meeting Organizer</h2>
      <div>
        <TextContainer title='Buildings' total={buildings?.length} />
        <TextContainer title='Meeting Rooms' total={meetingRooms?.length} />
      </div>
      {/* <Container>
        <AddMeeting buildings={buildings} />
      </Container> */}
      <button
        onClick={() =>
          navigate('/add-meeting', { state: { buildings: buildings } })
        }
      >
        Add a meeting
      </button>
      <hr height='2px' width='50%' />
      {/* {buildings && <BuildingInfo buildings={buildings} />} */}
    </div>
  );
};

export default Home;
