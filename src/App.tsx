// src/App.tsx
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home_screen/home';
import ContactPage from './contact_screen/main_contact';
import MessagePage from './contact_screen/messgaes'; // New
import IncomingCallPage from './contact_screen/incoming_call'; // New
import VideoCallPage from './contact_screen/video_call'; // New
import VoiceCallPage from './contact_screen/voice_call'; // New
import ContactCardPage from './contact_screen/contact_card_design'
function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/messages/:id" element={<MessagePage />} />
        <Route path="/video-call" element={<VideoCallPage />} />
        <Route path="/contact" element={<VideoCallPage />} />
        {/* Pass the required props to UserCardPage */}
        <Route
          path="/user-card" element={<ContactCardPage/>}
        />
        <Route path="/incoming-call" element={<IncomingCallPage />} /> {/* New incoming call route */}
        <Route path="/voice-call" element={<VoiceCallPage />} />  
        <Route path="/contact-card/:id" element={<ContactCardPage />}/>
      </Routes>
    </Router>
  );
}

export default App;