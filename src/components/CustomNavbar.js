import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export default function CustomNavbar() {
  return (
    <Navbar className='custom-navbar'>
      <Container>
        <Navbar.Brand href='#home'>Meeting Organizer</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
