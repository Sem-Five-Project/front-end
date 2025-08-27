'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

type DecodedToken = {
  role: string;
  sub: string;
  iat: number;
  exp: number;
  name: string; 
};

export default function Dashboard() {
  const [tokenData, setTokenData] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setTokenData(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {tokenData ? (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <p><strong>Role:</strong> {tokenData.role}</p>
          <p><strong>Email (sub):</strong> {tokenData.sub}</p>
            <p><strong>Name:</strong> {tokenData.name}</p>
        </div>
      ) : (
        <p>Loading token data...</p>
      )}
    </div>
  );
}
