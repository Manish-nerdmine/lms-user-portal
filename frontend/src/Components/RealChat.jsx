import React, { useState } from "react";
import {
  FiSearch,
  FiSend,
  FiHome,
  FiMessageSquare,
  FiX,
} from "react-icons/fi";

export default function Chat({ isOpen, onClose }) {
  const [screen, setScreen] = useState("home"); 
  const [messages, setMessages] = useState([
    { from: "support", text: " Hi! How can we help?" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  // agar open nahi hai to kuch render mat karo
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="w-[360px] h-[600px] bg-white shadow-lg rounded-xl overflow-hidden flex flex-col relative">
        {/* HEADER */}
        <div className="bg-green-600 text-white px-4 py-3 font-semibold text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            {screen !== "home" && (
              <button
                onClick={() =>
                  setScreen(screen === "chat" ? "messages" : "home")
                }
                className="text-white text-xl"
              >
                ←
              </button>
            )}
            {screen === "home" && "Hi there "}
            {screen === "messages" && "Messages"}
            {screen === "chat" && "Customer Support"}
          </div>

          {/* ❌ Close Button */}
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl"
            title="Close"
          >
            <FiX />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {/* HOME SCREEN */}
          {screen === "home" && (
            <div className="p-4 space-y-4">
              <p className="text-gray-700 text-sm">
                Need help? Search our help center for answers or start a
                conversation:
              </p>

              {/* Help Center */}
              <div className="bg-white rounded-lg p-3 shadow border">
                <p className="font-semibold text-gray-800 mb-2">Help Center</p>
                <div className="flex items-center border rounded px-2 py-1">
                  <FiSearch className="text-gray-500 mr-2" />
                  <input
                    placeholder="Search for answers"
                    className="flex-1 outline-none text-sm"
                  />
                </div>
              </div>

              {/* New Conversation */}
              <div
                onClick={() => setScreen("messages")}
                className="bg-white rounded-lg p-3 shadow border cursor-pointer hover:bg-green-50 transition"
              >
                <p className="font-semibold text-gray-800">
                  New Conversation
                </p>
                <p className="text-sm text-gray-500">
                  We typically reply in a few minutes
                </p>
              </div>
            </div>
          )}

          {/* MESSAGES SCREEN */}
          {screen === "messages" && (
            <div className="p-4 space-y-4">
              <div
                onClick={() => setScreen("chat")}
                className="border rounded-lg p-3 shadow-sm hover:bg-green-50 cursor-pointer"
              >
                <p className="text-gray-800 font-semibold">
                   Hi! How can we help?
                </p>
                <p className="text-sm text-gray-400">now</p>
              </div>
            </div>
          )}

          {/* CHAT SCREEN */}
          {screen === "chat" && (
            <div className="flex flex-col h-full justify-between">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg text-sm ${
                        msg.from === "user"
                          ? "bg-green-100 text-gray-800"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      setMessages([
                        ...messages,
                        { from: "user", text: "I have a question" },
                      ])
                    }
                    className="border border-green-600 text-green-600 rounded-lg px-3 py-1 text-sm hover:bg-green-50"
                  >
                    I have a question
                  </button>
                  <button
                    onClick={() =>
                      setMessages([
                        ...messages,
                        { from: "user", text: "Tell me more" },
                      ])
                    }
                    className="border border-green-600 text-green-600 rounded-lg px-3 py-1 text-sm hover:bg-green-50"
                  >
                    Tell me more
                  </button>
                </div>
              </div>

              {/* Chat input */}
              <div className="border-t bg-white flex items-center px-3 py-2 gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type here and press enter..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 outline-none text-sm"
                />
                <button
                  onClick={handleSend}
                  className="text-green-600 text-xl hover:text-green-700"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER NAV */}
        <div className="flex justify-around items-center border-t bg-white py-2 text-gray-500">
          <button
            onClick={() => setScreen("home")}
            className={`flex flex-col items-center ${
              screen === "home" ? "text-green-600" : ""
            }`}
          >
            <FiHome className="text-xl" />
          </button>
          <button
            onClick={() => setScreen("messages")}
            className={`flex flex-col items-center ${
              screen === "messages" ? "text-green-600" : ""
            }`}
          >
            <FiMessageSquare className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
