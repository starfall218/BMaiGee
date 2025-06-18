import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVolumeUp, // Speaker icon
  MdVideocam, // Placeholder for video call option, if any
} from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

interface VoiceCallPageProps {}

const VoiceCallPage: React.FC<VoiceCallPageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Default values for contact, will be overridden by location.state
  const [contactName, setContactName] = useState<string>('Your Name');
  const [contactAvatar, setContactAvatar] = useState<string>('https://via.placeholder.com/150/CCCCCC/FFFFFF?text=!');
  const [callStatus, setCallStatus] = useState<string>('Ringing...'); // Could be '00:00' for ongoing call
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  // Mock contact data (same as IncomingCallPage)
  const mockContacts = {
    'jeff-johnson': { name: 'Jeff Johnson', avatar: 'https://via.placeholder.com/150/D1E9E9/9FC1C1?text=JJ' },
    'kate-madison': { name: 'Kate Madison', avatar: 'https://via.placeholder.com/150/E8D2E1/B98FA5?text=KM' },
  };

  useEffect(() => {
    if (location.state && typeof location.state === 'object' && 'contactId' in location.state) {
      const state = location.state as { contactId: string };
      const contact = mockContacts[state.contactId as keyof typeof mockContacts];
      if (contact) {
        setContactName(contact.name);
        setContactAvatar(contact.avatar);
      }
    }

    // Simulate call status change after a short delay for demonstration
    const timer = setTimeout(() => {
      setCallStatus('00:05'); // Simulate 5 seconds into the call
      // In a real app, you'd start a proper call timer here
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [location.state]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    console.log(`Mic is now ${!isMuted ? 'muted' : 'unmuted'}`);
  }, [isMuted]);

  const toggleSpeaker = useCallback(() => {
    setIsSpeakerOn(prev => !prev);
    console.log(`Speaker is now ${!isSpeakerOn ? 'on' : 'off'}`);
  }, [isSpeakerOn]);

  const handleEndCall = useCallback(() => {
    console.log('Voice call ended.');
    navigate(-1); // Go back
  }, [navigate]);

  const handleDecline = useCallback(() => {
    // This button appears if it's an outgoing call that hasn't been picked up
    // Or if the other person is still ringing.
    console.log('Outgoing call declined/cancelled.');
    navigate(-1); // Go back
  }, [navigate]);

  const handleAccept = useCallback(() => {
      // This button is for an incoming call.
      // Since IncomingCallPage handles the actual "answer", this is more for outgoing "picked up" state.
      console.log('Call accepted (from previous page).');
      // Transition call status if needed
  }, []);


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between text-white p-6 pb-12 overflow-hidden">
      {/* Background Image with Glassy Blur Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{
          backgroundImage: `url(${contactAvatar})`,
          filter: 'blur(20px) brightness(0.7)',
          transform: 'scale(1.1)'
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Dark overlay for contrast */}

      {/* Top Section: Name and Status */}
      <div className="relative z-10 text-center mt-12">
        <h1 className="text-4xl font-bold">{contactName}</h1>
        <p className="text-lg opacity-80 mt-2">{callStatus}</p>
      </div>

      {/* Call Controls (bottom) */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs mb-8">
        {/* Buttons for Mute and Speaker */}
        <div className="flex justify-around w-full mb-10">
          <button
            onClick={toggleMute}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90
              ${isMuted ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-20'} focus:outline-none focus:ring-2 focus:ring-white`}
          >
            {isMuted ? <MdMicOff size={30} className="text-white" /> : <MdMic size={30} className="text-white" />}
          </button>
          <button
            onClick={toggleSpeaker}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90
              ${isSpeakerOn ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-20'} focus:outline-none focus:ring-2 focus:ring-white`}
          >
            <MdVolumeUp size={30} className="text-white" />
          </button>
          {/* If you want a video icon as per 9720daaa02208484e7cbb8e325b0d2c6.jpg's voice call section */}
          <button
            className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center
              transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <MdVideocam size={30} className="text-white" />
          </button>
        </div>

        {/* Decline/Accept or End Call Buttons */}
        {callStatus === 'Ringing...' ? ( // If still ringing, show Decline/Accept from 9720daaa02208484e7cbb8e325b0d2c6.jpg
          <div className="flex justify-between w-full">
            <button
              onClick={handleDecline}
              className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <MdCallEnd size={36} className="text-white" />
            </button>
            <button
              onClick={handleAccept} // This would be the 'Accept' button for an outgoing call
              className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <MdCallEnd size={36} className="text-white rotate-[135deg]" /> {/* Rotated phone icon */}
            </button>
          </div>
        ) : ( // If call is ongoing, show just End Call button
          <button
            onClick={handleEndCall}
            className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <MdCallEnd size={36} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceCallPage;