// my own css file
import '../home_screen/mystyle.css';
// Import Lucide React icons
import {
  ArrowLeft,
  MoreVertical,
  Heart,
  X,
  MessageSquare,
  Smile
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const UserCardPage = () => {
  const navigate = useNavigate(); 


  // Dummy text
  const user = {
    name: "Aisha",
    age: 28,
    location: "Lagos, Nigeria",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnvTYoKirLr5e3Iovcu--uw4Vo3bsfziavJQ&s", // Placeholder image
    isOnline: true,
    tags: ["Photography", "Travel", "Coffee Lover", "Hiking"],
    bio: "Passionate photographer always looking for new adventures and candid moments. Love exploring new places, meeting new people, and enjoying a good cup of coffee. Let's connect and share stories!",
  };

  // Define internal handlers for actions
  const handleBack = () => {
    console.log("Back button clicked (internal)");
    navigate(-1); // Go back to the previous page
  };

  const handleLike = () => {
    console.log("Like button clicked (internal)");
    // Add actual like logic here (e.g., API call)
  };

  const handleDislike = () => {
    console.log("Dislike button clicked (internal)");
    // Add actual dislike logic here (e.g., API call)
  };

  const handleMessage = () => {
    console.log("Message button clicked (internal)");
    // Add actual message initiation logic here (e.g., navigate to chat screen)
    navigate(`/messages/${user.name.toLowerCase().replace(/\s/g, '-')}`); // Example navigation
  };

  return (
    <div className="min-h-screen bg-dark-purple-bg text-white relative">
      <img
        src={user.profilePic}
        alt={user.name}
        className="w-full h-2/3 object-cover absolute top-0 left-0 contact-profile-image" 
      />

      {/* Gradient Overlay for Readability */}
      <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-t from-dark-purple-bg via-transparent to-transparent opacity-80"></div>

      {/* Top Bar (Back, Name, More Options) */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <button onClick={handleBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <span className="text-xl font-semibold">{user.name}</span>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <MoreVertical className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* User Info Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-16 bg-dark-purple-bg rounded-t-3xl shadow-xl z-20">
        <div className="flex items-center space-x-2 mb-4">
          {user.isOnline && <span className="w-3 h-3 bg-green-500 rounded-full"></span>}
          <span className="text-sm">{user.isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">{user.name}, {user.age}</h2>
        <p className="text-text-gray-light mb-4 flex items-center">
          <Smile className="mr-2 w-5 h-5" /> {user.location}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {user.tags.map((tag, index) => (
            <span key={index} className="bg-white/10 text-white text-sm px-4 py-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-text-gray-light leading-relaxed mb-16">{user.bio}</p>
      </div>

      {/* Action Buttons (Dislike, Like, Message) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-around items-center bg-dark-purple-bg/90 z-30">
        <button
          onClick={handleDislike}
          className="p-4 rounded-full bg-light-purple-accent/20 hover:bg-light-purple-accent/30 transition-colors active:scale-95"
        >
          <X className="w-6 h-6 text-light-purple-accent" />
        </button>
        <button
          onClick={handleLike}
          className="p-4 rounded-full bg-accent-blue hover:bg-accent-blue/80 transition-colors shadow-lg active:scale-95"
        >
          <Heart className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={handleMessage}
          className="p-4 rounded-full bg-light-purple-accent/20 hover:bg-light-purple-accent/30 transition-colors active:scale-95"
        >
          <MessageSquare className="w-6 h-6 text-light-purple-accent" />
        </button>
      </div>
    </div>
  );
};

export default UserCardPage;