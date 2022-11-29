export const GRAPHQL_API = 'https://smart-meeting.herokuapp.com/';

export const GET_BUILDINGS = `
query Buildings {
  Buildings {
    id
    name
    meetingRooms {
      name
      id
      floor
      building{
        id
      }
      meetings{
        id
        title
        date
        startTime
        endTime
        
      }
    }
  }
}
`;

// Fetch All Meeting Rooms
export const GET_MEETING_ROOMS = `
query MeetingRooms{ 
  MeetingRooms{
      name
      floor
      building {
        name
      }
      meetings {
        title
      }
  }
}`;

// Add a meeting

export const updateSpnotification = /* GraphQL */ `
  mutation UpdateSpnotification(
    $input: UpdateSpnotificationInput!
    $condition: ModelspnotificationConditionInput
  ) {
    updateSpnotification(input: $input, condition: $condition) {
      email
      eventtime
      eventid
      eventname
      eventdesc
      eventtype
      readflag
    }
  }
`;

// export const ADD_MEETING = `
// mutation Meeting ($id: Int!,
//   $title: String!,
//   $date: String!,
//   $startTime: String!,
//   $endTime: String!,
//   $meetingRoomId: Int!){
//     Meeting(id: $id, title: $title, date: $date, startTime:$startTime, endTime:$endTime, meetingRoomId:$meetingRoomId ){
//       id
//       title
//     }
//   }
// `;

export const ADD_MEETING = `
mutation Meeting ($id: Int!,
  $title: String!,
  $date: String!,
  $startTime: String!,
  $endTime: String!,
  $meetingRoomId: Int!){
    Meeting(id: $id, title: $title, date: $date, startTime:$startTime, endTime:$endTime, meetingRoomId:$meetingRoomId   ){
      id
      title
    }
  }
`;
