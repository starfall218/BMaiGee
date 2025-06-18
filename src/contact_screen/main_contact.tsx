import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch, IoMdCall, IoMdChatbubbles } from 'react-icons/io';
import { MdOutlineLightbulb } from 'react-icons/md'; // For AI suggestions

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastInteraction?: number; // Unix timestamp for sorting frequency
  interactionCount?: number; // Higher count for more frequent
}

interface RecentMessageBoxProps {
  senderName: string;
  senderAvatar: string;
  messageContent: string;
}

const RecentMessageBox: React.FC<RecentMessageBoxProps> = ({ senderName, senderAvatar, messageContent }) => {
  return (
    <div
      className="relative w-full h-32 rounded-xl overflow-hidden shadow-lg mb-6 flex items-center justify-start p-4"
      style={{
        backgroundImage: `url(${senderAvatar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Glassy Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-white flex flex-col justify-center h-full">
        <h3 className="text-xl font-bold">{senderName}</h3>
        <p className="text-sm opacity-90 mt-1">{messageContent}</p>
      </div>
    </div>
  );
};

interface AISuggestionBoxProps {
  onDismiss: () => void;
}

const AISuggestionBox: React.FC<AISuggestionBoxProps> = ({ onDismiss }) => {
  return (
    <div className="relative w-full rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-4 text-white shadow-lg mb-6 flex items-start space-x-3">
      <MdOutlineLightbulb size={28} className="flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-semibold text-lg">AI Suggestion: Reconnect!</h3>
        <p className="text-sm opacity-90 mt-1">It looks like you haven't chatted with some contacts recently. How about sending a quick hello?</p>
        {/* Optional: Add a button to navigate to a "reconnect" list */}
        <button onClick={onDismiss} className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors">
          &times;
        </button>
      </div>
    </div>
  );
};


const ContactsPage: React.FC = () => {
  const navigate = useNavigate();

  // Simulated AI state for showing suggestions
  const [showAISuggestion, setShowAISuggestion] = useState(true);

  // Mock contact data with simulated interaction history
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 'jeff-johnson', name: 'Jeff Johnson', avatar: 'https://via.placeholder.com/150/D1E9E9/9FC1C1?text=JJ', lastInteraction: Date.now() - 1000 * 60 * 5, interactionCount: 10 }, // 5 mins ago
    { id: 'kate-madison', name: 'Kate Madison', avatar: 'https://via.placeholder.com/150/E8D2E1/B98FA5?text=KM', lastInteraction: Date.now() - 1000 * 60 * 60 * 24 * 3, interactionCount: 5 }, // 3 days ago
    { id: 'john-doe', name: 'John Doe', avatar: 'https://via.placeholder.com/150/A0B9D8/FFFFFF?text=JD', lastInteraction: Date.now() - 1000 * 60 * 60 * 24 * 7, interactionCount: 2 }, // 7 days ago
    { id: 'jane-smith', name: 'Jane Smith', avatar: 'https://via.placeholder.com/150/F0C4B8/FFFFFF?text=JS', lastInteraction: Date.now() - 1000 * 60 * 60 * 24 * 1, interactionCount: 8 }, // 1 day ago
    { id: 'tim-brown', name: 'Tim Brown', avatar: 'https://via.placeholder.com/150/B8F0C4/FFFFFF?text=TB', lastInteraction: undefined, interactionCount: 0 }, // No recent interaction
    { id: 'kelly-williams', name: 'Kelly Williams', avatar: 'https://via.placeholder.com/150/D1E9E9/9FC1C1?text=KW', lastInteraction: Date.now() - 1000 * 60 * 30, interactionCount: 7 }, // 30 mins ago
    { id: 'rene-wells', name: 'Rene Wells', avatar: 'https://via.placeholder.com/150/A0B9D8/FFFFFF?text=RW', lastInteraction: Date.now() - 1000 * 60 * 60 * 24 * 10, interactionCount: 1 }, // 10 days ago
    { id: 'jack-richards', name: 'Jack Richards', avatar: 'https://via.placeholder.com/150/F0C4B8/FFFFFF?text=JR', lastInteraction: undefined, interactionCount: 0 },
    { id: 'katherine-moss', name: 'Katherine Moss', avatar: 'https://via.placeholder.com/150/B8F0C4/FFFFFF?text=KM', lastInteraction: Date.now() - 1000 * 60 * 60 * 2, interactionCount: 6 }, // 2 hours ago
  ]);

  // Simulate a recent message sender for the top box
  const [latestMessage, setLatestMessage] = useState({
    senderId: 'jeff-johnson',
    content: 'Hey, are you free for a quick call?',
  });

  // Derived state for the recent message box data
  const recentMessageSender = useMemo(() => {
    const senderContact = contacts.find(c => c.id === latestMessage.senderId);
    return senderContact ? {
      senderName: senderContact.name,
      senderAvatar: senderContact.avatar,
      messageContent: latestMessage.content,
    } : null;
  }, [contacts, latestMessage]);


  // Sort contacts based on interaction frequency or alphabetically
  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      // Prioritize contacts with recent interactions
      if (a.lastInteraction && b.lastInteraction) {
        return b.lastInteraction - a.lastInteraction; // More recent (higher timestamp) first
      }
      if (a.lastInteraction) return -1; // a has interaction, b doesn't, so a comes first
      if (b.lastInteraction) return 1;  // b has interaction, a doesn't, so b comes first

      // If no recent interaction, sort by interactionCount (higher is more frequent)
      if (a.interactionCount !== undefined && b.interactionCount !== undefined) {
        if (b.interactionCount !== a.interactionCount) {
          return b.interactionCount - a.interactionCount;
        }
      }

      // Fallback to alphabetical if no recent interaction or interactionCount difference
      return a.name.localeCompare(b.name);
    });
  }, [contacts]);

  // Simulate updating interaction data (e.g., after a call or chat)
  const updateInteraction = useCallback((contactId: string) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === contactId
          ? {
              ...contact,
              lastInteraction: Date.now(),
              interactionCount: (contact.interactionCount || 0) + 1,
            }
          : contact
      )
    );
  }, []);

  // Handlers for navigation
  const handleCall = useCallback((contactId: string) => {
    updateInteraction(contactId);
    navigate('/voice-call', { state: { contactId: contactId } });
  }, [navigate, updateInteraction]);

  const handleChat = useCallback((contactId: string) => {
    updateInteraction(contactId);
    navigate(`/messages/${contactId}`);
  }, [navigate, updateInteraction]);

  const handleContactClick = useCallback((contactId: string) => {
    navigate(`/contact-card/${contactId}`);
  }, [navigate]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <button className="text-gray-600 active:scale-95 transition-transform">
            <IoMdSearch size={28} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {/* AI Suggestion Box */}
        {showAISuggestion && (
          <AISuggestionBox onDismiss={() => setShowAISuggestion(false)} />
        )}

        {/* "Just Sent You a Text" Box */}
        {recentMessageSender && (
          <RecentMessageBox
            senderName={recentMessageSender.senderName}
            senderAvatar={recentMessageSender.senderAvatar}
            messageContent={recentMessageSender.messageContent}
          />
        )}

        {/* Contact List */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3 mt-4">All Contacts</h2>
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          {sortedContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-3">
              <div
                className="flex items-center flex-grow cursor-pointer"
                onClick={() => handleContactClick(contact.id)}
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <span className="font-medium text-gray-900">{contact.name}</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleCall(contact.id)}
                  className="p-2 rounded-full text-blue-600 hover:bg-blue-100 active:scale-95 transition-transform"
                >
                  <IoMdCall size={22} />
                </button>
                <button
                  onClick={() => handleChat(contact.id)}
                  className="p-2 rounded-full text-purple-600 hover:bg-purple-100 active:scale-95 transition-transform"
                >
                  <IoMdChatbubbles size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;