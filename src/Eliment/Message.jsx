import React, { useState } from "react";
import FriendsSidebar from "./Friends/FriendsSlidebar";
import ChatWindow from "./Friends/ChatWindow";

/**
 * On phones ( <768px ) the sidebar is a slide‑in drawer.
 * On tablets/desktop it’s fixed on the left.
 */
const Messaging = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* close drawer after friend click */
  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setSidebarOpen(false);
  };

  return (
    <div className="h-[78vh] w-full bg-gray-100 md:flex overflow-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}

      {/* SIDEBAR */}
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

      {/*  CHAT  */}
      <div className="flex-1 h-full flex flex-col">
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

export default Messaging;
