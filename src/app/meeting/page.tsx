'use client';
import { useEffect, useState } from 'react';
import { generateJitsiTokenAction, generateJitsiTokenActionlater } from '../actions/meetingActions';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function MeetingPage() {
  const tenant = process.env.NEXT_PUBLIC_TENANT || 'yourTenant'; // Replace if needed
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('DemoRoom');
  const [userName, setUserName] = useState('Chamindu');
  const [loading, setLoading] = useState(false);

  const generateToken = async () => {
    setLoading(true);
    const tok = await generateJitsiTokenActionlater(roomName);
    setToken(tok);
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      const domain = 'localhost:8443';
      const options = {
  roomName: `${roomName}`,
  parentNode: document.getElementById('jitsi-container'),
  jwt: token,
  userInfo: {
    displayName: userName,
  },
  configOverwrite: {
    startWithAudioMuted: true,
    startWithVideoMuted: true,
  },
  interfaceConfigOverwrite: {
    TOOLBAR_BUTTONS: [
      'microphone',
      'camera',
      'chat',
      'tileview',
      'fullscreen',
      'hangup',
      "recording",
      'settings',
      'raisehand'
    ],
    HIDE_INVITE_MORE_HEADER: true,
    MOBILE_APP_PROMO: false
  }
};


      const api = new window.JitsiMeetExternalAPI(domain, options);
      console.log('Jitsi API initialized:', api);

      return () => api?.dispose(); 
    }
  }, [token]);

  return (
    <div className="p-4">
      {!token && (
        <div className="space-y-4">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room Name"
            className="border p-2 w-full"
          />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="border p-2 w-full"
          />
          <button
            onClick={generateToken}
            className="bg-blue-600 text-white px-4 py-2"
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join Meeting'}
          </button>
        </div>
      )}

      <div id="jitsi-container" className="mt-6" style={{ height: '700px', width: '100%' }}></div>
    </div>
  );
}
