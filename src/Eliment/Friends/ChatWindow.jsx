import React, { useEffect, useRef, useState } from "react";
import { getDatabase, push, ref, onValue, off } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaBars, FaPaperPlane } from "react-icons/fa";

const ChatWindow = ({ friend, onOpenSidebar }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUid, setCurrentUid] = useState(null);
  const messagesEndRef = useRef(null);

  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUid(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const getThreadId = (uid1, uid2) => [uid1, uid2].sort().join("_");

  useEffect(() => {
    if (!currentUid || !friend?.userUid) return;

    const threadId = getThreadId(currentUid, friend.userUid);
    const msgRef = ref(db, `messages/${threadId}`);

    setMessages([]);

    onValue(msgRef, (snap) => {
      const msgs = [];
      snap.forEach((child) => {
        msgs.push(child.val());
      });
      msgs.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgs);
    });

    // unsubscribe using off() to remove listener
    return () => {
      off(msgRef);
    };
  }, [currentUid, friend]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const message = text.trim();
    if (!message || !currentUid || !friend?.userUid) return;

    const threadId = getThreadId(currentUid, friend.userUid);

    push(ref(db, `messages/${threadId}`), {
      senderUid: currentUid,
      receiverUid: friend.userUid,
      text: message,
      timestamp: Date.now(),
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow-sm flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="md:hidden text-xl text-gray-600"
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
        <img
          src={friend.profile_picture}
          alt={friend.username}
          className="w-9 h-9 rounded-full object-cover border"
        />
        <h2 className="font-semibold text-lg">{friend.username}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, i) => {
          const isMine = msg.senderUid === currentUid;
          return (
            <div
              key={i}
              className={`max-w-[70%] mb-2 p-2 rounded break-words ${
                isMine
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-white text-gray-800 border"
              }`}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex gap-2">
        <textarea
          rows={1}
          className="flex-1 border rounded p-2 resize-none max-h-28 focus:outline-none"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center"
          aria-label="Send message"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
