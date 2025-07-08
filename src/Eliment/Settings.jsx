import React, { useState } from "react";

const SettingsPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <div className="bg-themebackgroundcolor w-full p-6 h-full rounded-r-md">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Profile Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourname123"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              className="w-5 h-5"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <input
              type="checkbox"
              checked={pushNotif}
              onChange={() => setPushNotif(!pushNotif)}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={() => alert("Settings saved!")}
      >
        Save Changes
      </button>
    </div>
  );
};

export default SettingsPage;
