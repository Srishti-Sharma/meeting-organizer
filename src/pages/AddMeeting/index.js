import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserInput } from '../../actions/actions';
import { CustomAlert } from '../../components';

export default function AddMeeting() {
  const buildings = useSelector((state) => state?.buildings?.buildings);
  const dispatch = useDispatch();

  const getData = localStorage.getItem('userInput');

  const [userInput, setUserInput] = useState(JSON.parse(getData) || {});
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let newInput = { ...userInput, [e.target.name]: e.target.value };
    setUserInput(newInput);
  };

  const validateInput = () => {
    let error = {};
    if (
      userInput?.startTime >= userInput?.endTime ||
      !Object.keys(userInput?.building || {})?.length
    ) {
      if (!Object.keys(userInput?.building || {})?.length) {
        error.heading = 'Please fill the complete form';
        error.message = 'Please select a building';
      } else {
        error.heading = 'Please check the form';
        error.message = 'start-time must be smaller than end-time';
      }
      return { isValid: false, error };
    } else return { isValid: true, error };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const inputValidator = validateInput();
    const isValidInput = inputValidator.isValid;
    const error = inputValidator.error;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(isValidInput);

    if (isValidInput) {
      localStorage.setItem('userInput', JSON.stringify(userInput));
      dispatch(addUserInput(userInput));
      navigate('/add-room');
    } else {
      setErrors(error);
    }
  };

  return (
    <Container className='my-5'>
      {!validated && errors ? <CustomAlert error={errors} /> : null}
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Card>
            <Card.Header as='h4' className='py-3'>
              Add a Meeting
            </Card.Header>
            <Card.Body>
              <Form
                // noValidate
                validated={validated}
                className='mb-3'
                onSubmit={handleSubmit}
              >
                <Form.Group as={Row}>
                  <Form.Label column sm='3'>
                    Meeting Title:{' '}
                  </Form.Label>
                  <Col sm='9'>
                    <Form.Control
                      required
                      type='text'
                      name='title'
                      key='meeting-title'
                      value={userInput.title}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                  <Form.Label column sm='3'>
                    Date:
                  </Form.Label>
                  <Col sm='9'>
                    <Form.Control
                      required
                      type='date'
                      name='date'
                      value={userInput.date}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                  <Form.Label column sm='3'>
                    Start Time:{' '}
                  </Form.Label>
                  <Col sm='9'>
                    <Form.Control
                      required
                      type='time'
                      name='startTime'
                      value={userInput.startTime}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row}>
                  <Form.Label column sm='3'>
                    End Time:{' '}
                  </Form.Label>
                  <Col sm='9'>
                    <Form.Control
                      required
                      type='time'
                      name='endTime'
                      value={userInput.endTime}
                      onChange={handleChange}
                    />
                  </Col>
                  <Form.Text id='passwordHelpBlock' muted>
                    End time should be greater than start time
                  </Form.Text>
                </Form.Group>
                <br />

                <Form.Group as={Row}>
                  <Form.Label column sm='3'>
                    Select Building:
                  </Form.Label>
                  <Col sm='9'>
                    <Form.Select
                      required
                      // value={userInput.building}
                      onChange={(e) => {
                        setUserInput({
                          ...userInput,
                          building: buildings[e.target.value],
                        });
                      }}
                    >
                      <option>Select a building</option>
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
                    </Form.Select>
                  </Col>
                </Form.Group>
                <br />
                <br />
                <Button
                  variant='secondary'
                  type='submit'
                  // disabled={!userInput.building}
                >
                  Next
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
