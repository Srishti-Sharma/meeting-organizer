import './App.css';
import Home from './pages/Home';
import AddMeeting from './pages/AddMeeting';
import { Route, Routes } from 'react-router-dom';
import AddRoom from './pages/AddRoom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/add-meeting' element={<AddMeeting />} />
        <Route path='/add-room' element={<AddRoom />} />
        <Route path='*' element={<div> No Matching route found! </div>} />
      </Routes>
    </div>
  );
}

export default App;
