import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MoreVertical,
  Pencil,
  X,
} from 'lucide-react';
import { IoMdCall, IoMdChatbubbles, IoMdVideocam } from 'react-icons/io';

// Define mock contacts here for consistency across components
const MOCK_CONTACTS: { [key: string]: Contact } = {
  'jeff-johnson': { id: 'jeff-johnson', name: 'Jeff Johnson', avatar: 'https://via.placeholder.com/150/00CED1/FFFFFF?text=JJ',
    about: "The one and only Jeff Johnson! 🚀 Always bringing the good vibes and planning the next big adventure. A true master of witty comebacks and finding the best coffee spots. Expect spontaneous calls and deep conversations late at night. ☕✨"
  },
  'kate-madison': { id: 'kate-madison', name: 'Kate Madison', avatar: 'https://via.placeholder.com/150/40E0D0/FFFFFF?text=KM',
    about: "Kate, the creative soul with a heart of gold. 🎨 Loves quiet evenings with a good book and long walks in nature. Always there to lend an ear and offer thoughtful advice. Her calm presence is a breath of fresh air. 🍃💖"
  },
  'john-doe': { id: 'john-doe', name: 'John Doe', avatar: 'https://via.placeholder.com/150/7FFFD4/000000?text=JD',
    about: "John, the tech wizard who can fix anything! 👨‍💻 Fascinated by gadgets and future tech, he's always got the latest scoop. Might send you random memes at 3 AM. A loyal friend with an endless supply of dad jokes. 😂💡"
  },
  'jane-smith': { id: 'jane-smith', name: 'Jane Smith', avatar: 'https://via.placeholder.com/150/20B2AA/FFFFFF?text=JS',
    about: "Jane, the fitness guru who inspires everyone around her. 🏃‍♀️ Always up for a challenge, whether it's a marathon or mastering a new recipe. Her energy is contagious, and she makes healthy living look effortless. 💪🍓"
  },
  'tim-brown': { id: 'tim-brown', name: 'Tim Brown', avatar: 'https://via.placeholder.com/150/66CDAA/000000?text=TB',
    about: "Tim, the chill dude who's always down for anything. 🎸 Loves indie music, late-night gaming sessions, and discovering obscure documentaries. His laid-back attitude is super refreshing. A reliable friend who knows how to have a good time. 🎮🎵"
  },
  'kelly-williams': { id: 'kelly-williams', name: 'Kelly Williams', avatar: 'https://via.placeholder.com/150/008080/FFFFFF?text=KW',
    about: "Kelly, the vibrant social butterfly who knows everyone! 🦋 Her calendar is always packed, but she always makes time for her friends. Expect invites to the coolest events and the most entertaining stories. Life is never dull with Kelly around. 🎉🥂"
  },
  'rene-wells': { id: 'rene-wells', name: 'Rene Wells', avatar: 'https://via.placeholder.com/150/4682B4/FFFFFF?text=RW',
    about: "Rene, the adventurer always seeking new horizons. 🏞️ Whether it's hiking a mountain or exploring a new city, she's fearless. Her stories of travel and daring escapades are legendary. The ultimate road trip buddy! 🗺️✨"
  },
  'jack-richards': { id: 'jack-richards', name: 'Jack Richards', avatar: 'https://via.placeholder.com/150/5F9EA0/FFFFFF?text=JR',
    about: "Jack, the foodie extraordinaire and master chef. 👨‍🍳 He knows all the best restaurants and can whip up a gourmet meal in minutes. Prepare for delicious updates and maybe even a surprise delivery of baked goods! 🍰🍜"
  },
  'katherine-moss': { id: 'katherine-moss', name: 'Katherine Moss', avatar: 'https://via.placeholder.com/150/87CEEB/000000?text=KM',
    about: "Katherine, the insightful artist with a keen eye for beauty. 🖌️ Her observations are always on point, and she sees the world in vivid colors. A deep thinker who loves art galleries and philosophical debates. 🧠🖼️"
  },
};

interface Contact {
  id: string;
  name: string;
  avatar: string;
  about: string;
}

const ContactCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [contact, setContact] = useState<Contact | null>(null);
  const [showEditCard, setShowEditCard] = useState(false);
  const [editableContact, setEditableContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (id) {
      const foundContact = MOCK_CONTACTS[id];
      if (foundContact) {
        setContact(foundContact);
        setEditableContact({ ...foundContact });
      } else {
        setContact(null);
        setEditableContact(null);
      }
    }
  }, [id]);

  const handleCall = useCallback(() => {
    if (contact) navigate('/voice-call', { state: { contactId: contact.id } });
  }, [contact, navigate]);

  const handleVideoCall = useCallback(() => {
    if (contact) navigate('/video-call', { state: { contactId: contact.id } });
  }, [contact, navigate]);

  const handleChat = useCallback(() => {
    if (contact) navigate(`/messages/${contact.id}`);
  }, [contact, navigate]);

  const handleEditClick = useCallback(() => {
    setShowEditCard(true);
  }, []);

  const handleCloseEditCard = useCallback(() => {
    setShowEditCard(false);
    if (contact) {
      setEditableContact({ ...contact });
    }
  }, [contact]);

  const handleEditInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableContact(prev => prev ? { ...prev, [name]: value } : null);
  }, []);

  const handleEditAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditableContact(prev => prev ? { ...prev, avatar: event.target?.result as string } : null);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  const handleSaveChanges = useCallback(() => {
    if (editableContact) {
      setContact(editableContact);
      setShowEditCard(false);
    }
  }, [editableContact]);

  if (!contact) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">Contact Not Found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Image & Overlay - cover full parent, positioned behind content */}
      <img
        src={contact.avatar}
        alt={contact.name}
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75 transition-all duration-500 z-0"
      />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/90 via-cyan-100/70 to-transparent z-0"></div>

      {/* Top Bar (fixed position to stay on top, highest z-index) */}
      <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-30">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-sm transition-colors active:scale-95">
          <ArrowLeft className="w-6 h-6 text-cyan-800" />
        </button>
        <div className="flex space-x-2">
            <button onClick={handleEditClick} className="p-2 rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-sm transition-colors active:scale-95">
                <Pencil className="w-6 h-6 text-cyan-800" />
            </button>
            <button className="p-2 rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-sm transition-colors active:scale-95">
                <MoreVertical className="w-6 h-6 text-cyan-800" />
            </button>
        </div>
      </div>

      {/* Main Content Area - Contains profile pic and white card. Flex-grow pushes it down. */}
      <div className="relative z-20 flex flex-col flex-grow items-center justify-end">
        {/* White Card Background - positioned at the bottom of the flex-grow space */}
        <div className="w-full bg-white rounded-t-3xl shadow-xl pt-16 px-6 pb-6 relative">
            {/* Profile Picture - positioned relative to THIS white card background */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
                />
            </div>

            {/* Contact Info Section */}
            <div className="flex flex-col items-center mt-12 mb-6"> {/* mt-12 accounts for profile picture */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{contact.name}</h2>

                {/* Icon Bar */}
                <div className="flex space-x-6">
                    <button
                        onClick={handleCall}
                        className="flex flex-col items-center p-3 rounded-full bg-cyan-100 text-cyan-700 shadow-sm hover:bg-cyan-200 active:scale-95 transition-all duration-200 ease-in-out group"
                    >
                        <IoMdCall size={28} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Call</span>
                    </button>
                    <button
                        onClick={handleChat}
                        className="flex flex-col items-center p-3 rounded-full bg-cyan-100 text-cyan-700 shadow-sm hover:bg-cyan-200 active:scale-95 transition-all duration-200 ease-in-out group"
                    >
                        <IoMdChatbubbles size={28} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Chat</span>
                    </button>
                    <button
                        onClick={handleVideoCall}
                        className="flex flex-col items-center p-3 rounded-full bg-cyan-100 text-cyan-700 shadow-sm hover:bg-cyan-200 active:scale-95 transition-all duration-200 ease-in-out group"
                    >
                        <IoMdVideocam size={28} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Video</span>
                    </button>
                </div>
            </div>

            {/* Personal Info Text Section - allows scrolling if content is too long */}
            <div className="w-full flex-grow overflow-y-auto px-4 py-2 text-gray-700 leading-relaxed text-center bg-cyan-50/50 backdrop-blur-sm rounded-lg shadow-inner">
                <p className="text-lg">
                    {contact.about}
                </p>
            </div>
        </div>
      </div>

      {/* Edit Contact Card Modal */}
      {showEditCard && editableContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50"
          onClick={handleCloseEditCard} // Click outside to close
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-md mx-auto mt-20 relative" // Adjust mt-20 to be 2rem below icons
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Contact</h3>
            
            <div className="flex flex-col items-center mb-6">
                <img
                    src={editableContact.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-cyan-300"
                />
                <label className="bg-cyan-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-cyan-600 transition-colors">
                    Change Picture
                    <input type="file" accept="image/*" className="hidden" onChange={handleEditAvatarChange} />
                </label>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editableContact.name}
                onChange={handleEditInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-800"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="about" className="block text-gray-700 text-sm font-semibold mb-2">About</label>
              <textarea
                id="about"
                name="about"
                value={editableContact.about}
                onChange={handleEditInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-800 resize-none"
              ></textarea>
            </div>

            <button
              onClick={handleSaveChanges}
              className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-colors active:scale-95"
            >
              Save Changes
            </button>

            <button
              onClick={handleCloseEditCard}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCardPage;