import React, { useState } from "react";
import FriendsSidebar from "./Friends/FriendsSlidebar";
import ChatWindow from "./Friends/ChatWindow";

const Messaging = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showChat, setShowChat] = useState(false); // For mobile toggle

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setShowChat(true); // Show chat on mobile
  };

  return (
    <div className="w-full h-[96vh] bg-white md:flex">
      {/* Friend List */}
      {!showChat && (
        <div className="w-full md:w-[30%] border-r overflow-y-auto">
          <FriendsSidebar
            onSelectFriend={handleFriendSelect}
            selectedFriend={selectedFriend}
          />
        </div>
      )}

      {/* Chat Window */}
      {selectedFriend && showChat && (
        <div className="w-full md:flex-1">
          <ChatWindow
            friend={selectedFriend}
            onBack={() => setShowChat(false)} // only for mobile
          />
        </div>
      )}

      {/* Placeholder */}
      {!selectedFriend && !showChat && (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
          Select a friend to chat
        </div>
      )}
    </div>
  );
};

export default Messaging;
