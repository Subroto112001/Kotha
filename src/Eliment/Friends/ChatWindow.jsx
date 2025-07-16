import React, { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onChildAdded,
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

  // Thread ID (sorted UID to ensure uniqueness)
  const threadId = [auth.currentUser.uid, friend.userUid].sort().join("_");

  // Real-time listener using onChildAdded
  useEffect(() => {
    const msgRef = ref(db, `messages/${threadId}`);
    const handleNewMessage = (snapshot) => {
      const newMsg = snapshot.val();
      setMessages((prev) => [...prev, newMsg]);
    };

    const unsubscribe = onChildAdded(msgRef, handleNewMessage);
    return () => unsubscribe();
  }, [threadId]);

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message handler
  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    push(ref(db, `messages/${threadId}`), {
      senderUid: auth.currentUser.uid,
      receiverUid: friend.userUid,
      text: trimmed,
      timestamp: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b bg-white">
        <button
          onClick={onOpenSidebar}
          className="md:hidden text-xl text-gray-600"
        >
          <FaBars />
        </button>
        <img
          src={friend.profile_picture}
          alt={friend.username}
          className="w-9 h-9 rounded-full border object-cover"
        />
        <h2 className="text-lg font-semibold">{friend.username}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50">
        {messages.map((m, i) => {
          const isMine = m.senderUid === auth.currentUser.uid;
          return (
            <div
              key={i}
              className={`max-w-[80%] whitespace-pre-wrap break-words px-3 py-2 rounded-lg mb-2 ${
                isMine
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-white text-gray-900 border"
              }`}
            >
              {m.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <textarea
            className="flex-1 resize-none border rounded-md p-2 max-h-28 focus:outline-none"
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message…"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            onClick={send}
            disabled={!text.trim()}
            className={`px-4 rounded flex items-center justify-center transition ${
              text.trim()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-white cursor-not-allowed"
            }`}
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
