import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addMeeting } from '../../actions/actions';

import { GRAPHQL_API } from '../../graphql/constants';
import { ADD_MEETING } from '../../graphql/mutations';

import './styles.css';

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
  const navigate = useNavigate();

  const userInput = useSelector((state) => state?.userInput);
  const { building } = userInput;

  const dispatch = useDispatch();

  const [selectedRoom, setSelectedRoom] = useState();

  const availableRooms = useMemo(() => {
    let res = building?.meetingRooms?.filter((room) => {
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
        ) {
          return true;
        }
        return false;
      });
      if (filteredRes.length === room.meetings.length) return room;
    });
    return res;
  }, [building?.meetingRooms, userInput]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let date = new Date(userInput.date).toLocaleString();
    let newDate = date.split(',')[0];
    newDate = newDate.split('/').join('-');

    const roomObj = {
      title: userInput.title,
      date: newDate,
      startTime: userInput.startTime,
      endTime: userInput.endTime,
      id: 18,
      meetingRoomId: selectedRoom.id,
      building: userInput.building,
    };
    localStorage.clear();
    dispatch(addMeeting(roomObj));
    navigate('/');

    // axios
    //   .post(
    //     GRAPHQL_API,
    //     {
    //       query: ADD_MEETING,
    //       variables: roomObj,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         token: `Bearer a123gjhgjsdf6576`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     let data = response.data.data;
    //     // console.log('data ', data);
    //     navigate('/');
    //   })
    //   .catch((error) => console.log(error));
  };

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Card>
            <Card.Header as='h4' className='py-3'>
              Please select one of the rooms
            </Card.Header>
            <Card.Body>
              {availableRooms?.length ? (
                <>
                  <Row className='justify-content-center'>
                    <Col sm='9'>
                      <ListGroup className='list-container'>
                        {availableRooms?.map((bld) => {
                          return (
                            <>
                              <ListGroup.Item
                                key={bld.name + bld.id}
                                action
                                onClick={(e) => {
                                  setSelectedRoom(bld);
                                }}
                              >
                                {bld?.name}
                              </ListGroup.Item>
                            </>
                          );
                        })}
                      </ListGroup>
                    </Col>
                  </Row>
                  <br />
                  <p>Total available rooms: {availableRooms.length}</p>

                  <div className='mt-5'>
                    <Button
                      variant='secondary'
                      onClick={handleSubmit}
                      disabled={!availableRooms?.length || !selectedRoom}
                    >
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Card.Text>
                    No meeting rooms available for selected date and time{' '}
                  </Card.Text>
                  <Button variant='link' onClick={() => navigate(-1)}>
                    Select Other Building
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
