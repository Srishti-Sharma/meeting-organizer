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
