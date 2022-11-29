import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const MeetingContainer = styled.div`
   {
    margin: 10px;
    padding: 10px 30px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 400px;
  }
`;
export const Container = styled.div`
   {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
`;

export default function AddMeeting() {
  const location = useLocation();
  const { buildings } = location.state;
  const [userInput, setUserInput] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    let newInput = { ...userInput, [e.target.name]: e.target.value };
    setUserInput(newInput);
  };

  // const validateNext = () => {

  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/add-room', { state: { userInput: userInput } });
  };

  return (
    <Container>
      <MeetingContainer>
        <>
          <h3>Add a Meeting</h3>
          <form onSubmit={handleSubmit}>
            <label>Meeting Title: </label>
            <input
              type='text'
              name='title'
              key='meeting-title'
              // value={userInput.title}
              onChange={handleChange}
            />
            <br />
            <br />
            <label>Date: </label>
            <input
              type='date'
              name='date'
              // value={userInput.date}
              onChange={handleChange}
            />
            <br />
            <br />
            <label>Start Time: </label>
            <input
              type='time'
              name='startTime'
              // value={userInput.startTime}
              onChange={handleChange}
            />
            <br />
            <br />
            <label>End Time: </label>
            <input
              type='time'
              name='endTime'
              // value={userInput.endTime}
              onChange={handleChange}
            />
            <br />
            <br />
            <label>Select Building: </label>

            <select
              // value={userInput.building}
              onChange={(e) => {
                setUserInput({
                  ...userInput,
                  building: buildings[e.target.value],
                });
              }}
            >
              <option key={'select'} value={'Select a building'}>
                Select a building
              </option>
              {buildings &&
                buildings.map((bld, index) => {
                  return (
                    <option
                      disabled={bld.meetingRooms.length === 0}
                      key={bld.id}
                      value={index}
                    >
                      {bld?.name}
                    </option>
                  );
                })}
            </select>
            <br />
            <br />
            <button type='submit' disabled={!userInput.building}>
              Next
            </button>
          </form>
        </>
      </MeetingContainer>
    </Container>
  );
}
