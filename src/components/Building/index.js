import React from 'react';

import styled from 'styled-components';

const BuildingContainer = styled.div`
   {
    margin: 10px;
    padding: 10px 30px;
    background-color: thistle;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 400px;
  }
`;

export default function Building({ details }) {
  return (
    <BuildingContainer>
      <h2>{details?.name}</h2>

      <p>
        {details?.meetingRooms.length
          ? `${details?.meetingRooms.length} Meeting rooms`
          : 'No Meeting rooms available in this building'}
      </p>

      {details?.meetingRooms?.map((room) => {
        return (
          <div key={room.id}>
            <h4>
              Room Name: {room.name} - Floor: {room.floor}
            </h4>
            <h4>
              {' '}
              {room?.meetings?.length
                ? 'Meetings: '
                : 'No Meetings for this room'}
            </h4>

            {room?.meetings?.map((meeting) => {
              return (
                <div key={meeting.id}>
                  <p> {meeting.title}</p>
                  <p>Date: {meeting.date}</p>
                  <p>
                    From {meeting.startTime} to {meeting.endTime}{' '}
                  </p>
                </div>
              );
            })}
            <hr height='2px' width='50%' />
          </div>
        );
      })}
    </BuildingContainer>
  );
}
