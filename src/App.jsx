import { Routes, Route } from 'react-router'

import EventCreate from './components/EventCreate/EventCreate'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import EventIndex from './components/EventIndex/EventIndex'
import EventShow from './components/EventShow/EventShow'
import EventUpdate from './components/EventUpdate/EventUpdate'
import Profile from './components/Profile/Profile'
import Navbar from './components/Navbar/Navbar'


function App() {
  return (
    <>
    <h1 className='web-title'>Hubbub</h1>
    <Navbar />
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/events' element={<EventIndex />} />
      <Route path='/events/:eventId' element={<EventShow />} />
      <Route path='/events/create' element={<EventCreate />} />
      <Route path='/events/:eventId/update' element={<EventUpdate />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    </>
  )
}

export default App