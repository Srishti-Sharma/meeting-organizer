import { ADD_MEETING, UPDATE_BUILDINGS } from '../constants';
import { dummyBuildings } from '../dummy';

const initialState = { buildings: dummyBuildings };

const buildings = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_MEETING: {
      let newState = JSON.parse(JSON.stringify(state));
      let updatedBuildings = newState.buildings.map((building) => {
        if (building.id === payload.building.id) {
          let newBuilding = { ...building };
          newBuilding.meetingRooms = building.meetingRooms.map((room) => {
            if (room.id === payload.meetingRoomId) {
              let newPayload = { ...payload };
              delete newPayload.meetingRoomId;
              delete newPayload.building;
              room.meetings = [...room.meetings, newPayload];
            }
            return room;
          });
          return newBuilding;
        }
        return building;
      });
      return { ...state, buildings: updatedBuildings };
    }
    case UPDATE_BUILDINGS: {
      return [...payload];
    }

    default:
      return state;
  }
};
export default buildings;
