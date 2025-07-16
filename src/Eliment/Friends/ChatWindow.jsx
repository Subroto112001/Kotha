import React, { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  push,
  serverTimestamp,
} from "firebase/database";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

const ChatWindow = ({ friend, onBack }) => {
  const auth = getAuth();
  const db = getDatabase();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const threadId = [auth.currentUser.uid, friend.userUid].sort().join("_");

  // Realtime fetch messages
  useEffect(() => {
    const msgRef = ref(db, `messages/${threadId}`);
    return onValue(msgRef, (s) => {
      const list = [];
      s.forEach((c) => list.push(c.val()));
      list.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(list);
    });
  }, [threadId]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const send = () => {
    if (!text.trim()) return;
    push(ref(db, `messages/${threadId}`), {
      senderUid: auth.currentUser.uid,
      receiverUid: friend.userUid,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* ░░ Header ░░ */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b shadow-sm sticky top-0 z-10">
        {/* Back button on mobile */}
        <button
          onClick={onBack}
          className="md:hidden text-xl text-gray-700"
          title="Back"
        >
          <FaArrowLeft />
        </button>

        <img
          src={friend.profile_picture}
          alt={friend.username}
          className="w-10 h-10 rounded-full border object-cover"
        />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          {friend.username}
        </h2>
      </div>

      {/* ░░ Messages ░░ */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-6">
            No messages yet.
          </p>
        )}
        {messages.map((m, i) => {
          const mine = m.senderUid === auth.currentUser.uid;
          return (
            <div
              key={i}
              className={`max-w-[75%] text-sm sm:text-base px-4 py-2 rounded-2xl mb-3 shadow 
                ${
                  mine
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-white text-gray-800 border"
                }`}
            >
              {m.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ░░ Input ░░ */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <textarea
            className="flex-1 resize-none text-sm p-2 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Type a message..."
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            onClick={send}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow transition-all"
            title="Send"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
