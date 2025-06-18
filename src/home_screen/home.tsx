import React from 'react';
import { IoNotificationsOutline } from 'react-icons/io5'; // For the notification icon
import NavBar from '../navbar/navbar'; // Assuming your NavBar component is here

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20"> {/* pb-20 for navbar space */}

      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          {/* Small Profile Image */}
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/32" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-lg">Padizone</span>
        </div>
        <IoNotificationsOutline size={24} className="text-gray-600" />
      </header>

      {/* Main Content Area */}
      <main className="p-4 space-y-8">

        {/* Welcome Section */}
        <section className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Welcome back, Amelia</p>
            <h2 className="font-semibold text-xl mt-1">How are you feeling today?</h2>
            <p className="text-sm text-gray-600 mt-1">Let's check-in and set some intentions for the day</p>
            <button className="mt-4 px-6 py-2 rounded-full text-white font-medium
                               bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg
                               hover:from-cyan-500 hover:to-blue-700 transition-all duration-200 ease-in-out">
              Start Check-in
            </button>
          </div>
          <div className="w-24 h-24 ml-4 flex-shrink-0">
            {/* Placeholder for the abstract image */}
            <img src="https://via.placeholder.com/120x120/E0E7FF/81A1C1?text=Abstract" alt="Abstract Art" className="w-full h-full object-cover rounded-lg" />
          </div>
        </section>

        {/* Past Activities */}
        <section>
          <h3 className="font-semibold text-lg mb-4">Past Activities</h3>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {/* Activity Card 1 */}
            <div className="flex-shrink-0 w-40 p-4 bg-white rounded-xl shadow-md text-center">
              <div className="w-24 h-24 mx-auto mb-2">
                <img src="https://via.placeholder.com/96x96/F4E4D9/D8A78F?text=Abstract" alt="Morning Routine" className="w-full h-full object-cover rounded-lg" />
              </div>
              <p className="font-medium">Morning Routine</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            {/* Activity Card 2 */}
            <div className="flex-shrink-0 w-40 p-4 bg-white rounded-xl shadow-md text-center">
              <div className="w-24 h-24 mx-auto mb-2">
                <img src="https://via.placeholder.com/96x96/F0D2C7/E8B29E?text=Abstract" alt="Evening Reflection" className="w-full h-full object-cover rounded-lg" />
              </div>
              <p className="font-medium">Evening Reflection</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            {/* Add more activity cards if needed */}
            <div className="flex-shrink-0 w-40 p-4 bg-white rounded-xl shadow-md text-center">
              <div className="w-24 h-24 mx-auto mb-2">
                <img src="https://via.placeholder.com/96x96/D9EBEB/B0D5D6?text=Abstract" alt="Mindfulness" className="w-full h-full object-cover rounded-lg" />
              </div>
              <p className="font-medium">Mindfulness</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
        </section>

        {/* Today's Schedule */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Today's Schedule</h3>
          <p className="text-sm text-gray-600 mb-4">October 24, 2024</p>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide mb-4">
            {['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'].map((time, index) => (
              <div key={time} className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm
                                         ${index === 2 ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-transparent' : 'bg-white border-gray-300 text-gray-700'}`}>
                {time}
              </div>
            ))}
          </div>

          {/* No tasks for this time slot card */}
          <div className="relative p-6 rounded-xl shadow-md overflow-hidden"
               style={{
                 backgroundImage: 'url("https://via.placeholder.com/400x200/F0D2C7/E8B29E?text=Abstract")', // Background image for the card
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}>
             {/* Overlay for readability */}
             <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
             <div className="relative z-10 text-white">
                <h4 className="font-semibold text-lg">No tasks for this time slot</h4>
                <p className="text-sm mt-1">Enjoy your free time or add a new task</p>
                <button className="mt-4 px-6 py-2 rounded-full text-white font-medium
                                   bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg
                                   hover:from-cyan-500 hover:to-blue-700 transition-all duration-200 ease-in-out">
                    Add Task
                </button>
             </div>
          </div>
        </section>

        {/* AI Suggestions */}
        <section>
          <h3 className="font-semibold text-lg mb-4">AI Suggestions</h3>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {/* AI Suggestion Card 1 */}
            <div className="flex-shrink-0 w-52 p-4 bg-white rounded-xl shadow-md">
              <div className="w-full h-24 mb-2">
                <img src="https://via.placeholder.com/200x96/D9EBEB/B0D5D6?text=Abstract" alt="Connect with Liam" className="w-full h-full object-cover rounded-lg" />
              </div>
              <p className="font-medium text-sm">Connect with Liam</p>
              <p className="text-xs text-gray-500">Go on and start a chat</p>
            </div>
            {/* AI Suggestion Card 2 */}
            <div className="flex-shrink-0 w-52 p-4 bg-white rounded-xl shadow-md">
              <div className="w-full h-24 mb-2">
                <img src="https://via.placeholder.com/200x96/E0E7FF/81A1C1?text=Abstract" alt="Check in with Chloe" className="w-full h-full object-cover rounded-lg" />
              </div>
              <p className="font-medium text-sm">Check in with Chloe</p>
              <p className="text-xs text-gray-500">Go on and start a chat</p>
            </div>
            {/* Add more AI suggestion cards */}
            <div className="flex-shrink-0 w-52 p-4 bg-white rounded-xl shadow-md">
              <div className="w-full h-24 mb-2">
                <img src="https://via.placeholder.com/200x96/F4E4D9/D8A78F?text=Abstract" alt="Mental Reset" className="w-full h-full object-cover rounded-lg" />
              </div>
              <p className="font-medium text-sm">Mental Reset</p>
              <p className="text-xs text-gray-500">Start your daily session</p>
            </div>
          </div>
        </section>

        {/* New Messages */}
        <section>
          <h3 className="font-semibold text-lg mb-4">New Messages</h3>
          <div className="space-y-4">
            {[
              { name: 'Olivia', msg: 'Hey, how\'s going?', time: '10:53 AM', avatar: 'https://via.placeholder.com/40/F4D8C8/C09788?text=O' },
              { name: 'Ethan', msg: 'Just wanted to say Hi!', time: '11:15 AM', avatar: 'https://via.placeholder.com/40/D1E9E9/9FC1C1?text=E' },
              { name: 'Sophia', msg: 'What are you up to?', time: '12:00 PM', avatar: 'https://via.placeholder.com/40/E8D2E1/B98FA5?text=S' },
            ].map((message) => (
              <div key={message.name} className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                <img src={message.avatar} alt={message.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                <div className="flex-grow">
                  <p className="font-medium text-base">{message.name}</p>
                  <p className="text-sm text-gray-600">{message.msg}</p>
                </div>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Calls */}
        <section>
          <h3 className="font-semibold text-lg mb-4">Recent Calls</h3>
          <div className="space-y-4">
            {[
              { name: 'Caleb', status: 'Incoming', time: '2 min', avatar: 'https://via.placeholder.com/40/D9EBEB/B0D5D6?text=C' },
              { name: 'Ava', status: 'Outgoing', time: '5 min', avatar: 'https://via.placeholder.com/40/E0E7FF/81A1C1?text=A' },
              { name: 'Owen', status: 'Incoming', time: 'Yesterday', avatar: 'https://via.placeholder.com/40/F4D8C8/C09788?text=O' },
            ].map((call) => (
              <div key={call.name} className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                <img src={call.avatar} alt={call.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                <div className="flex-grow">
                  <p className="font-medium text-base">{call.name}</p>
                  <p className="text-sm text-gray-600">{call.status}</p>
                </div>
                <span className="text-xs text-gray-500">{call.time}</span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Fixed Bottom Navbar - Make sure NavBar.tsx is updated with aqua/white theme */}
      <NavBar />
    </div>
  );
};

export default HomePage;