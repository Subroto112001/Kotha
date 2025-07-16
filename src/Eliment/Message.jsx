import React, { useState } from "react";
import FriendsSidebar from "./Friends/FriendsSlidebar";
import ChatWindow from "./Friends//ChatWindow";
import { FaBars } from "react-icons/fa";

const Message = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setSidebarOpen(false);
  };

  return (
    <div className="h-[86vh] w-full bg-gray-100 md:flex overflow-hidden relative">
      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-72 max-w-[80%] bg-white shadow-lg transform
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:w-80`}
      >
        <FriendsSidebar
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
      </div>

      {/* Chat Panel */}
      <div className="flex-1 h-full flex flex-col relative">
        {/* Show hamburger when no friend selected (mobile) */}
        {!selectedFriend && (
          <div className="md:hidden p-3 border-b bg-white flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-xl text-gray-700"
            >
              <FaBars />
            </button>
            <h2 className="text-base font-semibold">Select a friend to chat</h2>
          </div>
        )}

        {selectedFriend ? (
          <ChatWindow
            friend={selectedFriend}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a friend to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
