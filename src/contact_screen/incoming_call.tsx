import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdPhoneCallback, MdMessage, MdCallEnd } from 'react-icons/md'; // Added MdCallEnd for possible decline
import { IoIosArrowForward } from 'react-icons/io'; // For swipe arrow

interface IncomingCallPageProps {}

const IncomingCallPage: React.FC<IncomingCallPageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get state passed from `useNavigate`

  // Default values for contact, will be overridden by location.state
  const [contactName, setContactName] = useState<string>('Your Name');
  const [contactAvatar, setContactAvatar] = useState<string>('https://via.placeholder.com/150/CCCCCC/FFFFFF?text=!');
  const [contactId, setContactId] = useState<string | undefined>(undefined); // To pass to message page

  // Mock contact data (in a real app, this would be fetched or passed via a global state)
  const mockContacts = {
    'jeff-johnson': { name: 'Jeff Johnson', avatar: 'https://via.placeholder.com/150/D1E9E9/9FC1C1?text=JJ' },
    'kate-madison': { name: 'Kate Madison', avatar: 'https://via.placeholder.com/150/E8D2E1/B98FA5?text=KM' },
    // Add other contacts as needed
  };

  useEffect(() => {
    if (location.state && typeof location.state === 'object' && 'contactId' in location.state) {
      const state = location.state as { contactId: string };
      setContactId(state.contactId);
      const contact = mockContacts[state.contactId as keyof typeof mockContacts];
      if (contact) {
        setContactName(contact.name);
        setContactAvatar(contact.avatar);
      }
    }
  }, [location.state]);

  const handleDecline = useCallback(() => {
    // In a real app, you'd send a signal to decline the call
    console.log('Call declined.');
    navigate(-1); // Go back to the previous page (e.g., chats)
  }, [navigate]);

  const handleAnswer = useCallback(() => {
    // In a real app, you'd answer the call and transition to the VoiceCallPage
    console.log('Call answered. Navigating to Voice Call Page.');
    navigate('/voice-call', { state: { contactId: contactId } }); // Pass contact info
  }, [navigate, contactId]);

  const handleRemindMe = useCallback(() => {
    console.log('Remind Me clicked.');
    // Implement reminder logic here
    navigate(-1); // Go back after setting reminder
  }, [navigate]);

  const handleMessage = useCallback(() => {
    console.log('Message clicked.');
    // Navigate to chat with contact and potentially pre-fill a message
    if (contactId) {
      navigate(`/messages/${contactId}`, { state: { fromCall: true, message: `📞 Call from ${contactName} was missed.` } });
    } else {
      navigate('/chats'); // Fallback if no contact ID
    }
  }, [navigate, contactId, contactName]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between text-white p-6 pb-12 overflow-hidden">
      {/* Background Image with Glassy Blur Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{
          backgroundImage: `url(${contactAvatar})`,
          filter: 'blur(20px) brightness(0.7)', // Increased blur for more glass effect, dimmed for text contrast
          transform: 'scale(1.1)' // Slightly zoom in to cover blur edges
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Dark overlay for contrast */}

      {/* Top Section: Name and Status */}
      <div className="relative z-10 text-center mt-12">
        <h1 className="text-4xl font-bold">{contactName}</h1>
        <p className="text-lg opacity-80 mt-2">Incoming call...</p>
      </div>

      {/* Middle Section: Action Buttons */}
      <div className="relative z-10 flex flex-col items-center space-y-8 mt-auto mb-auto">
        <div className="flex justify-around w-full max-w-xs px-4">
          {/* Remind Me */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleRemindMe}
              className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center
                transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <MdPhoneCallback size={30} className="text-white rotate-[270deg]" /> {/* Rotated for bell-like icon */}
            </button>
            <span className="text-sm mt-2 opacity-80">Remind Me</span>
          </div>

          {/* Message */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleMessage}
              className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center
                transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <MdMessage size={30} className="text-white" />
            </button>
            <span className="text-sm mt-2 opacity-80">Message</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Swipe to Answer */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Decline button (optional, or integrated into swipe mechanism) */}
        {/* For now, let's make it a separate button as per the image for clarity, if swipe is too complex for demo */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleDecline}
            className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center
              transition-all duration-200 active:scale-90 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <MdCallEnd size={32} className="text-white" />
          </button>
        </div>

        {/* Swipe to Answer Bar */}
        <div className="w-full h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center px-2 relative overflow-hidden">
          {/* The draggable part, visually */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 shadow-md">
            <IoIosArrowForward size={24} />
          </div>
          <span className="text-center w-full text-white text-lg font-semibold pointer-events-none">
            Slide to answer
          </span>

          <div
            onClick={handleAnswer}
            className="absolute inset-0 cursor-pointer"
            style={{ zIndex: 10 }} 
          ></div>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallPage;