'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function OAuthCallbackPage() {
  const {setUser} = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code) {
      console.log('Authorization Code:', code);

      // Call your backend API to exchange code for token
      fetch('http://localhost:8080/auth/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri: 'http://localhost:3000/oauth/callback' }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Access Token Response:', data);

          setUser({
            name: data.name,
            email: data.email,
          });

          router.push('/dashboard');
        })
        .catch((err) => {
          console.error('Token exchange error:', err);
        });
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-4">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-lg font-medium text-gray-700">Logging you in via Google...</p>
      </div>
    </div>
  );
}
