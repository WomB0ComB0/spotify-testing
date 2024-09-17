import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import Callback from './components/Callback';
import TopTracks from './components/TopTracks';
import { loginUrl } from './lib/spotify';

function App() {
  const { token, setToken } = useSpotifyAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate('/');
  };

  const handleSetToken = (newToken: string) => {
    setToken(newToken);
    setError(null);
  };

  const handleLoginError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/callback" element={<Callback setToken={handleSetToken} onError={handleLoginError} />} />
        <Route path="/" element={
          <div>
            <h1>Spotify Web Player</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {token ? (
              <>
                <p>You are logged in!</p>
                <button onClick={logout}>Logout</button>
                <TopTracks token={token} />
              </>
            ) : (
              <a href={loginUrl}>Login with Spotify</a>
            )}
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;

