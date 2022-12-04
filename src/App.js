import './App.css';
import { Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { AddMeeting, AddRoom, Home } from './pages';
import { CustomNavbar } from './components';

function App() {
  return (
    <div className='App'>
      <CustomNavbar />
      <Container className='root'>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/add-meeting' element={<AddMeeting />} />
          <Route path='/add-room' element={<AddRoom />} />
          <Route path='*' element={<div> No Matching route found! </div>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
