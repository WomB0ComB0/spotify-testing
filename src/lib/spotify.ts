const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

console.log('CLIENT_ID', CLIENT_ID);
console.log('REDIRECT_URI', REDIRECT_URI);
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const SCOPES = ["user-read-currently-playing", "user-top-read"];

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join("%20")}`;

let isTokenRequestInProgress = false;

export const getAccessToken = async (code: string) => {
  if (isTokenRequestInProgress) {
    console.log('Token request already in progress');
    return { error: 'Token request in progress' };
  }

  isTokenRequestInProgress = true;
  console.log('Attempting to get access token with code:', code);
  console.log('Redirect URI:', REDIRECT_URI);
  
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();
    console.log('Access token response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return { error: 'Failed to fetch access token' };
  } finally {
    isTokenRequestInProgress = false;
  }
};

// Add other Spotify API functions here (e.g., topTracks, topArtists, currentlyPlayingSong)

export const getNewAccessToken = async () => {
  const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) {
    throw new Error('No refresh token available');
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
    return data.access_token;
  } else {
    throw new Error('Failed to refresh access token');
  }
};

export const getCurrentlyPlaying = async (token: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getTopTracks = async (token: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};