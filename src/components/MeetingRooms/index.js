import React from 'react';
import './style.js';

export default function MeetingRooms({ details }) {
  return (
    <div>
      <p>Please select the meeting room {details.name}</p>
      <select>
        {details?.meetingRooms?.map((room) => {
          return (
            <option key={room.id} value={room.id} label={room.name}>
              <div>
                <h4>
                  Room Name: {room.name} - Floor: {room.floor}
                </h4>
              </div>
            </option>
          );
        })}
      </select>
    </div>
  );
}
