'use client';
import { useEffect } from 'react';

interface JitsiProps {
  roomName: string;
  token: string;
  userName: string;
}

export default function JitsiMeeting({ roomName, token, userName }: JitsiProps) {
  useEffect(() => {
    if (!window || !(window as any).JitsiMeetExternalAPI) return;

    const tenant = 'vpaas-magic-cookie-9a14da2c52de4d2da4c1ab82635750b3';
    const fullRoomName = `${tenant}/${roomName}`;

    console.log('Full Room Name:', fullRoomName);
    console.log('Token:', token);
    console.log('Window Location Origin:', window.location.origin);

    const meetingLink = `https://8x8.vc/${tenant}/${roomName}?jwt=${token}`;

    console.log('Meeting Link:********', meetingLink);

    const domain = '8x8.vc';
    const options = {
      roomName: fullRoomName,
      parentNode: document.getElementById('jitsi-container'),
      userInfo: { displayName: userName },
      configOverwrite: {},
      jwt: token,
    };

    const api = new (window as any).JitsiMeetExternalAPI(domain, options);
    return () => api.dispose();
  }, [roomName, token, userName]);



  return <div id="jitsi-container" style={{ height: '600px', width: '100%' }} />;
}

