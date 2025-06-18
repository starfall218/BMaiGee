import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

// Import the necessary icons
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'; // Home, User
import { RiContactsLine } from 'react-icons/ri'; // Contact (for search replacement)
import { GiStarsStack } from 'react-icons/gi'; // AI stars icon
import { IoBookOutline } from 'react-icons/io5'; // Journal icon

const NavBar: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Get current location to highlight active icon

  const navItems = [
    {
      icon: <AiOutlineHome size={24} />,
      text: 'Home',
      path: '/', // Path for Home page
    },
    {
      icon: <RiContactsLine size={24} />,
      text: 'Contact',
      path: '/contacts', // Path for Contact page
    },
    {
      // AI stars icon with aqua gradient background
      icon: (
        <div className="relative p-2 rounded-full bg-white text-gray-800 flex items-center justify-center">
          {/* Aqua gradient background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-75 blur-sm"></div>
          {/* White AI Stars icon */}
          <GiStarsStack size={24} className="relative z-10 text-white" />
        </div>
      ),
      text: 'AI',
      path: '/ai-assistant', // Example path for AI assistant
    },
    {
      icon: <IoBookOutline size={24} />,
      text: 'Journal',
      path: '/journal', // Example path for Journal page
    },
    {
      icon: <AiOutlineUser size={24} />,
      text: 'Profile',
      path: '/profile', // Example path for Profile page
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const textColor = isActive ? 'text-blue-600' : 'text-gray-500'; // Active color aqua/blue

          // Adjust icon color for non-special icons when active
          const iconColorClass = isActive && !item.path.includes('ai-assistant') ? 'text-blue-600' : '';

          return (
            <div
              key={item.text}
              className={`flex flex-col items-center justify-center text-sm font-medium cursor-pointer
                          ${textColor} transition-all duration-200 ease-in-out transform active:scale-95`}
              onClick={() => navigate(item.path)} // Navigate on click
            >
              {/* Render icon, applying active color if it's not the special AI icon */}
              {item.path === '/ai-assistant' ? item.icon : React.cloneElement(item.icon as React.ReactElement, {
                className: `${(item.icon as React.ReactElement).props.className || ''} ${iconColorClass}`
              })}
              <span className="mt-1">{item.text}</span>
              {/* Optional: Add an active indicator, e.g., a line below the active icon */}
              {isActive && (
                <div className="mt-1 w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;