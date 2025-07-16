import React, { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  push,
  serverTimestamp,
} from "firebase/database";
import { FaPaperPlane, FaBars } from "react-icons/fa";

const ChatWindow = ({ friend, onOpenSidebar }) => {
  const auth = getAuth();
  const db = getDatabase();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const threadId = [auth.currentUser.uid, friend.userUid].sort().join("_");

  // 📡 Fetch messages
  useEffect(() => {
    const msgRef = ref(db, `messages/${threadId}`);
    return onValue(msgRef, (s) => {
      const list = [];
      s.forEach((c) => list.push(c.val()));
      list.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(list);
    });
  }, [threadId]);

  // ⬇️ Auto-scroll to latest
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📨 Send message
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
    <div className="flex flex-col h-full bg-gray-50">
      {/* ░░ Header ░░ */}
      <div className="flex items-center gap-3 p-3 border-b bg-white shadow-sm sticky top-0 z-10">
        {/* ☰ Mobile hamburger */}
        <button
          onClick={onOpenSidebar}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          title="Open friend list"
        >
          <FaBars />
        </button>

        {/* Profile + Name */}
        <img
          src={friend.profile_picture}
          alt={friend.username}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <h2 className="text-base sm:text-lg font-semibold">
          {friend.username}
        </h2>
      </div>

      {/* ░░ Messages Area ░░ */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {messages.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-6">
            No messages yet.
          </p>
        )}
        {messages.map((m, i) => {
          const isMine = m.senderUid === auth.currentUser.uid;
          return (
            <div
              key={i}
              className={`max-w-[85%] sm:max-w-[70%] whitespace-pre-wrap break-words px-3 py-2 rounded-lg mb-2 text-sm sm:text-base
              ${
                isMine
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-white text-gray-800 border"
              }`}
            >
              {m.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ░░ Message Input ░░ */}
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <textarea
            className="flex-1 resize-none border rounded-md p-2 max-h-32 focus:outline-none text-sm sm:text-base"
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            onClick={send}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center"
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
