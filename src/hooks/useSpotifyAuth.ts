import { useState, useEffect } from 'react';
import { refreshAccessToken } from '../lib/spotify';

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) return;

    const refreshToken = async () => {
      try {
        const newToken = await refreshAccessToken();
        setToken(newToken);
      } catch (error) {
        console.error('Failed to refresh token:', error);
        setToken(null);
      }
    };

    const tokenExpiration = 3600 * 1000; // 1 hour in milliseconds
    const refreshInterval = setInterval(refreshToken, tokenExpiration - 300000); // Refresh 5 minutes before expiration

    return () => clearInterval(refreshInterval);
  }, [token]);

  return { token, setToken };
}