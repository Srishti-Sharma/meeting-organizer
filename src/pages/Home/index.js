import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import './styles.css';
import { Button, Card, Row, Col } from 'react-bootstrap';

import { useSelector } from 'react-redux';

export const CustomContainer = styled.div`
   {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const Home = () => {
  const buildings = useSelector((state) => state?.buildings?.buildings);

  const [meetingRooms, setMeetingRooms] = useState();
  const [todaysMeetings, setTodaysMeetings] = useState();
  const navigate = useNavigate();

  const totalMeetingRooms = () => {
    let initialValue = 0;
    return buildings.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.meetingRooms.length,
      initialValue
    );
  };

  const totalMeetingsToday = () => {
    let totalMeetings = [];
    let todaysDate = new Date().toLocaleDateString();
    todaysDate = todaysDate.split('/').join('-');

    buildings.forEach((building) => {
      building.meetingRooms.forEach((rooms) => {
        let x = rooms.meetings.filter((meeting) => meeting.date === todaysDate);
        totalMeetings = [...totalMeetings, ...x];
      });
    });
    return totalMeetings;
  };

  useEffect(() => {
    // fetchBuildings();
    // fetchMeetingRooms();
    setMeetingRooms(totalMeetingRooms());
    setTodaysMeetings(totalMeetingsToday());
  }, [buildings]);

  // const fetchBuildings = () => {
  //   axios
  //     .post(GRAPHQL_API, {
  //       query: GET_BUILDINGS,
  //     })
  //     .then((response) => {
  //       let data = response.data.data.Buildings;
  //       // setBuildings(data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const fetchMeetingRooms = () => {
  //   axios
  //     .post(GRAPHQL_API, {
  //       query: GET_MEETING_ROOMS,
  //     })
  //     .then((response) => {
  //       let data = response.data.data.MeetingRooms;
  //       // setMeetingRooms(data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <>
      <Row className='welcome-container'>
        <h2> Welcome to Meeting Organizer</h2>
      </Row>
      <Row className='justify-content-around my-5'>
        <Col xs={3} className='card-container'>
          <Card className='card-buildings' text='light'>
            <Card.Body>
              <Card.Title>Buildings</Card.Title>
              <p>Total buildings: {buildings?.length || 0}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3} className='card-container'>
          <Card className='card-meeting-rooms' text='dark'>
            <Card.Body>
              <Card.Title>Meeting Rooms</Card.Title>
              <p>Total meeting rooms: {meetingRooms || 0}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3} className='card-container'>
          <Card className='card-meetings' text='light'>
            <Card.Body>
              <Card.Title>Meetings</Card.Title>
              <p>Today's meetings: {todaysMeetings?.length || 0}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={6} lg={6} xs={6}>
          <Button variant='secondary' onClick={() => navigate('/add-meeting')}>
            Add a meeting
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Home;
