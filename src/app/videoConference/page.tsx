'use client'
import { useEffect, useState } from "react";
import Script from "next/script";

export default function VideoCallPage() {
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (roomName) {
      const domain = "meet.jit.si";
      const options = {
        roomName,
        width: "100%",
        height: 700,
        parentNode: document.getElementById("jitsi-container"),
      };
      // @ts-ignore
      new window.JitsiMeetExternalAPI(domain, options);
    }
  }, [roomName]);

  const startMeeting = () => {
    const newRoom = `Room-${Math.random().toString(36).substring(2, 10)}`;
    setRoomName(newRoom);
  };

  return (
    <div>
      <Script src="https://meet.jit.si/external_api.js" strategy="beforeInteractive" />
      <button
        onClick={startMeeting}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Meeting
      </button>
      <div id="jitsi-container" className="mt-4" />
    </div>
  );
}



// <!DOCTYPE html>
// <html>
//   <head>
//     <script src='https://8x8.vc/vpaas-magic-cookie-9a14da2c52de4d2da4c1ab82635750b3/external_api.js' async></script>
//     <style>html, body, #jaas-container { height: 100%; }</style>
//     <script type="text/javascript">
//       window.onload = () => {
//         const api = new JitsiMeetExternalAPI("8x8.vc", {
//           roomName: "vpaas-magic-cookie-9a14da2c52de4d2da4c1ab82635750b3/SampleAppReluctantExploitationsHandleSoftly",
//           parentNode: document.querySelector('#jaas-container'),
//           // Make sure to include a JWT if you intend to record,
//           // make outbound calls or use any other premium features!
//           // jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtOWExNGRhMmM1MmRlNGQyZGE0YzFhYjgyNjM1NzUwYjMvNGY0NGE1LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3NTM3MTA4NDMsImV4cCI6MTc1MzcxODA0MywibmJmIjoxNzUzNzEwODM4LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtOWExNGRhMmM1MmRlNGQyZGE0YzFhYjgyNjM1NzUwYjMiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOmZhbHNlLCJmaWxlLXVwbG9hZCI6ZmFsc2UsIm91dGJvdW5kLWNhbGwiOmZhbHNlLCJzaXAtb3V0Ym91bmQtY2FsbCI6ZmFsc2UsInRyYW5zY3JpcHRpb24iOmZhbHNlLCJsaXN0LXZpc2l0b3JzIjpmYWxzZSwicmVjb3JkaW5nIjpmYWxzZSwiZmxpcCI6ZmFsc2V9LCJ1c2VyIjp7ImhpZGRlbi1mcm9tLXJlY29yZGVyIjpmYWxzZSwibW9kZXJhdG9yIjp0cnVlLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWQiOiJnb29nbGUtb2F1dGgyfDEwNDI1OTE5NjM0MzM2MzIzNTI5MyIsImF2YXRhciI6IiIsImVtYWlsIjoidGVzdC51c2VyQGNvbXBhbnkuY29tIn19LCJyb29tIjoiKiJ9.j6NgZv4dk_R1cTIudE-4HCrsQirOaP3h3OocIoWBDc4rYPA3Nma8FAAe50dcFb_TOwv6XMpvReT8xhmfMFKTp7dAGLE-iVvsqjczFRPdIWnP7Y5VwuyJin7DdBam389qRYMG-ZhHaxRhC0_YncyPeb8UiP12ECQ6gD5GswAjq0rilqtvSBi75cHUibrfcFW_AKheuiSrRIXMO1Z1DtGOaIQJlGyIlDZ5e-KkkCs2ttym-4b4muSqYmFDvio8949PwrjcOV0DFZPnRxz4aqU_qX_VVaaJxmSVoi2xIV7Titfd6BZhlNGkBb6rQ2KVtWa9DU9B3dCpuQ7TD990PsvicQ"
//         });
//       }
//     </script>
//   </head>
//   <body><div id="jaas-container" /></body>
// </html>
