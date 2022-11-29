import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ADD_MEETING, GRAPHQL_API } from '../constants';
import { Container } from './Home';

const MeetingContainer = styled.div`
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

const doesDateClashes = (date1, date2) => {
  let newDate = `${date1.getDate()}`;
  newDate = newDate.length < 2 ? '0' + newDate : newDate;

  let newMonth = `${date1.getMonth() + 1}`;
  newMonth = newMonth.length < 2 ? '0' + newMonth : newMonth;

  const firstDate = `${newDate}-${newMonth}-${date1.getFullYear()}`;

  let secondDate = date2?.split('/');
  secondDate = secondDate?.join('-');

  return firstDate === secondDate;
};

const doesTimeClashes = (st1, et1, st2, et2) => {
  // assuming time will be in hrs:mins format
  if ((st1 < st2 && et1 < st2) || (st1 > st2 && st1 > et2)) return false;
  return true;
};

export default function AddRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInput } = location?.state || {};
  const { building } = userInput || {};

  const [selectedRoom, setSelectedRoom] = useState();

  const availableRooms = useMemo(() => {
    return building?.meetingRooms?.filter((room) => {
      let filteredRes = room.meetings.filter((meeting) => {
        //assuming date is in dd/mm/yyyy format
        let dateClash = doesDateClashes(
          new Date(userInput?.date),
          meeting.date
        );

        let timeClash = doesTimeClashes(
          userInput?.startTime,
          userInput?.endTime,
          meeting.startTime,
          meeting.endTime
        );
        if (
          (!dateClash && !timeClash) ||
          (dateClash && !timeClash) ||
          (!dateClash && timeClash)
        )
          return true;
      });
      if (filteredRes.length !== 0) return room;
    });
  }, [building.meetingRooms, userInput]);

  const handleSubmit = (e) => {
    // console.log('HANDLESUBMIT ', userInput);
    e.preventDefault();

    let date = new Date(userInput.date).toLocaleString();
    let newDate = date.split(',')[0];

    const varObj = {
      id: 18,
      title: userInput.title,
      date: newDate,
      startTime: userInput.startTime,
      endTime: userInput.endTime,
      meetingRoomId: selectedRoom.id,
    };

    axios
      .post(
        GRAPHQL_API,
        {
          query: ADD_MEETING,
          variables: varObj,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer a123gjhgjsdf6576`,
          },
        }
      )
      .then((response) => {
        let data = response.data.data;
        // console.log('data ', data);
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <MeetingContainer>
        <h3>Please select one of the rooms</h3>
        <form onSubmit={handleSubmit}>
          <label>Select a Room: </label>

          <select
            onChange={(e) =>
              setSelectedRoom(building?.meetingRooms[e.target.value])
            }
          >
            <option key={'select room'} value=''>
              Select a room
            </option>
            ;
            {availableRooms?.map((bld, index) => {
              return (
                <option key={bld.id + bld.name} value={index}>
                  {bld?.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <button
            type='submit'
            disabled={!availableRooms.length || !selectedRoom}
          >
            Save
          </button>
        </form>
      </MeetingContainer>
    </Container>
  );
}
