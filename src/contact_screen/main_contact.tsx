import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlineLightbulb, MdCallMissed, MdMessage } from 'react-icons/md';
import NavBar from '../navbar/navbar'; //
interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastInteraction?: number;
  interactionCount?: number;
}

interface RecentNotification {
  id: string;
  contactId: string;
  type: 'message' | 'missedCall';
  content: string;
  timestamp: number;
}

const MOCK_CONTACTS: { [key: string]: Contact } = {
  'jeff-johnson': { id: 'jeff-johnson', name: 'Jeff Johnson', avatar: 'https://via.placeholder.com/150/00CED1/FFFFFF?text=JJ' },
  'kate-madison': { id: 'kate-madison', name: 'Kate Madison', avatar: 'https://via.placeholder.com/150/40E0D0/FFFFFF?text=KM' },
  'john-doe': { id: 'john-doe', name: 'John Doe', avatar: 'https://via.placeholder.com/150/7FFFD4/000000?text=JD' },
  'jane-smith': { id: 'jane-smith', name: 'Jane Smith', avatar: 'https://via.placeholder.com/150/20B2AA/FFFFFF?text=JS' },
  'tim-brown': { id: 'tim-brown', name: 'Tim Brown', avatar: 'https://via.placeholder.com/150/66CDAA/000000?text=TB' },
  'kelly-williams': { id: 'kelly-williams', name: 'Kelly Williams', avatar: 'https://via.placeholder.com/150/008080/FFFFFF?text=KW' },
  'rene-wells': { id: 'rene-wells', name: 'Rene Wells', avatar: 'https://via.placeholder.com/150/4682B4/FFFFFF?text=RW' },
  'jack-richards': { id: 'jack-richards', name: 'Jack Richards', avatar: 'https://via.placeholder.com/150/5F9EA0/FFFFFF?text=JR' },
  'katherine-moss': { id: 'katherine-moss', name: 'Katherine Moss', avatar: 'https://via.placeholder.com/150/87CEEB/000000?text=KM' },
};

interface RecentNotificationBoxProps {
  notification: RecentNotification;
  contact: Contact;
}

const RecentNotificationBox: React.FC<RecentNotificationBoxProps> = ({ notification, contact }) => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    if (notification.type === 'message') {
      navigate(`/messages/${contact.id}`);
    } else if (notification.type === 'missedCall') {
      navigate(`/voice-call`, { state: { contactId: contact.id } });
    }
  };

  return (
    <div
      className="relative flex-shrink-0 w-64 h-32 rounded-xl overflow-hidden shadow-lg mr-4 cursor-pointer"
      style={{
        backgroundImage: `url(${contact.avatar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleBoxClick}
    >
      <div className="absolute inset-y-0 left-0 w-2/3 bg-white/15 backdrop-blur-sm rounded-l-xl z-10"></div>

      <div className="relative z-20 text-white flex flex-col justify-center h-full px-4">
        <h3 className="text-lg font-bold">{contact.name}</h3>
        <p className="text-sm opacity-90 mt-0.5 flex items-center">
          {notification.type === 'message' ? (
            <MdMessage size={16} className="mr-1 text-white/80" />
          ) : (
            <MdCallMissed size={16} className="mr-1 text-red-300" />
          )}
          {notification.content}
        </p>
      </div>
    </div>
  );
};

interface AISuggestionBoxProps {
  onDismiss: () => void;
}

const AISuggestionBox: React.FC<AISuggestionBoxProps> = ({ onDismiss }) => {
  return (
    <div className="relative w-full rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 p-4 text-white shadow-lg mb-6 flex items-start space-x-3">
      <MdOutlineLightbulb size={28} className="flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-semibold text-lg">AI Suggestion: Reconnect!</h3>
        <p className="text-sm opacity-90 mt-1">It looks like you haven't chatted with some contacts recently. How about sending a quick hello?</p>
        <button onClick={onDismiss} className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors">
          &times;
        </button>
      </div>
    </div>
  );
};

const ContactsPage: React.FC = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const initialContacts = Object.values(MOCK_CONTACTS);
    initialContacts.find(c => c.id === 'jeff-johnson')!.lastInteraction = Date.now();
    initialContacts.find(c => c.id === 'jeff-johnson')!.interactionCount = 10;
    initialContacts.find(c => c.id === 'kate-madison')!.lastInteraction = Date.now() - 1000 * 60 * 60 * 24 * 3;
    initialContacts.find(c => c.id === 'kate-madison')!.interactionCount = 5;
    initialContacts.find(c => c.id === 'jane-smith')!.lastInteraction = Date.now() - 1000 * 60 * 60 * 2;
    initialContacts.find(c => c.id === 'jane-smith')!.interactionCount = 8;
    initialContacts.find(c => c.id === 'kelly-williams')!.lastInteraction = Date.now() - 1000 * 60 * 30;
    initialContacts.find(c => c.id === 'kelly-williams')!.interactionCount = 7;
    return initialContacts;
  });

  const [recentNotifications, setRecentNotifications] = useState<RecentNotification[]>([
    { id: 'notif1', contactId: 'jeff-johnson', type: 'message', content: 'Hey, are you free for a quick call?', timestamp: Date.now() - 1000 * 60 * 2 },
    { id: 'notif2', contactId: 'kate-madison', type: 'missedCall', content: 'Missed Call', timestamp: Date.now() - 1000 * 60 * 5 },
    { id: 'notif3', contactId: 'jane-smith', type: 'message', content: 'Got your message!', timestamp: Date.now() - 1000 * 60 * 10 },
    { id: 'notif4', contactId: 'tim-brown', type: 'message', content: 'Long time no see!', timestamp: Date.now() - 1000 * 60 * 15 },
  ]);

  const [showAISuggestion, setShowAISuggestion] = useState(false);

  useEffect(() => {
    const oldestInteractionTime = contacts.reduce((minTime, contact) => {
      return contact.lastInteraction && contact.lastInteraction < minTime ? contact.lastInteraction : minTime;
    }, Date.now());

    const hasUninteractedContacts = contacts.some(c => !c.lastInteraction || c.interactionCount === 0);

    if (Date.now() - oldestInteractionTime > 1000 * 60 * 60 * 24 * 7 && hasUninteractedContacts) {
      setShowAISuggestion(true);
    } else {
      setShowAISuggestion(false);
    }
  }, [contacts]);

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      if (a.lastInteraction && b.lastInteraction) {
        return b.lastInteraction - a.lastInteraction;
      }
      if (a.lastInteraction) return -1;
      if (b.lastInteraction) return 1;

      if (a.interactionCount !== undefined && b.interactionCount !== undefined) {
        if (b.interactionCount !== a.interactionCount) {
          return b.interactionCount - a.interactionCount;
        }
      }
      return a.name.localeCompare(b.name);
    });
  }, [contacts]);

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

  const handleChatFromRowClick = useCallback((contactId: string) => {
    updateInteraction(contactId);
    navigate(`/messages/${contactId}`);
  }, [navigate, updateInteraction]);

  const handleContactCardClick = useCallback((e: React.MouseEvent, contactId: string) => {
    e.stopPropagation(); // Crucially stop propagation here
    navigate(`/contact-card/${contactId}`);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-white shadow-sm p-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <button className="text-gray-600 active:scale-95 transition-transform">
            <IoMdSearch size={28} />
          </button>
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {showAISuggestion ? (
          <AISuggestionBox onDismiss={() => setShowAISuggestion(false)} />
        ) : (
          recentNotifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Notifications</h2>
              <div className="flex overflow-x-auto whitespace-nowrap pb-2 -mr-4">
                {recentNotifications.map(notification => {
                  const contact = MOCK_CONTACTS[notification.contactId];
                  return contact ? (
                    <RecentNotificationBox key={notification.id} notification={notification} contact={contact} />
                  ) : null;
                })}
              </div>
            </div>
          )
        )}

        <h2 className="text-lg font-semibold text-gray-700 mb-3 mt-4">All Contacts</h2>
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
          {sortedContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center p-3 hover:bg-cyan-50 transition-colors cursor-pointer"
              onClick={() => handleChatFromRowClick(contact.id)} // Click anywhere on the row for messages
            >
              {/* This inner div contains the clickable elements for the contact card */}
              <div
                className="flex items-center flex-grow"
                // The stopPropagation should be inside the handler for the specific elements
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-cyan-300 cursor-pointer"
                  onClick={(e) => handleContactCardClick(e, contact.id)} // Click image for contact card
                />
                <span
                  className="font-medium text-gray-900 cursor-pointer"
                  onClick={(e) => handleContactCardClick(e, contact.id)} // Click name for contact card
                >
                  {contact.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <NavBar/>
      </div>
    </div>
  );
};

export default ContactsPage;