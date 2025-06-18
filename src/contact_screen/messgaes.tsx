import React from 'react';
import { IoIosArrowBack, IoMdCall, IoMdVideocam } from 'react-icons/io'; // Import call/video icons
import { FaPaperPlane } from 'react-icons/fa'; // For send icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface MessagePageProps {
  // You might pass user ID or name as prop if needed
}

const MessagePage: React.FC<MessagePageProps> = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // This would typically receive the contact's details via props or route params
  const contactName = "Jeff Johnson"; // Placeholder
  const contactStatus = "Active Now"; // Placeholder

  // Function to handle navigating to the call page
  const handleCallClick = () => {
    console.log(`Initiating call with ${contactName}`);
    navigate('/video-call'); // Navigate to the video call page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="text-gray-600"> {/* Use navigate(-1) for back */}
            <IoIosArrowBack size={24} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img src="https://via.placeholder.com/40/D1E9E9/9FC1C1?text=JJ" alt="Contact Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{contactName}</h2>
            <p className="text-xs text-green-500">{contactStatus}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Call Icon - now clickable */}
          <IoMdCall
            size={24}
            className="text-gray-600 cursor-pointer active:scale-95 transition-transform duration-100"
            onClick={handleCallClick}
          />
          {/* Video Call Icon - now clickable */}
          <IoMdVideocam
            size={24}
            className="text-gray-600 cursor-pointer active:scale-95 transition-transform duration-100"
            onClick={handleCallClick} // Both can go to the same call page for simplicity
          />
        </div>
      </div>

      {/* Message Area - Simple Placeholder */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        <div className="flex justify-start">
          <div className="bg-gray-200 p-3 rounded-xl max-w-xs">Hello!</div>
        </div>
        <div className="flex justify-end">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white p-3 rounded-xl max-w-xs">Good, Dude. Thanks</div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">Friday 12, 2023</p>
        <div className="flex justify-start">
          <div className="bg-gray-200 p-3 rounded-xl max-w-xs">Please send me the lastest report</div>
        </div>
        {/* Voice Message - Simplified */}
        <div className="flex justify-start items-center">
            <div className="bg-gray-200 p-3 rounded-xl flex items-center space-x-2">
                <IoMdCall size={20} className="text-gray-600" />
                <span>0:15</span>
                <div className="w-24 h-1 bg-gray-400 rounded-full"></div> {/* Simple progress bar */}
            </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Send Message"
          className="flex-grow px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white active:scale-95 transition-transform duration-100">
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessagePage;