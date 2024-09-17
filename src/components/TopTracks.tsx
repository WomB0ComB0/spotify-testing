import { useState, useEffect } from 'react';
import { getTopTracks } from '../lib/spotify';

function TopTracks({ token }: { token: string }) {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
      getTopTracks(token).then(data => {
        if (data.items) {
          setTracks(data.items.slice(0, 5)); // Get top 5 tracks
        }
      });
    }
  }, [token]);

  return (
    <div>
      <h2>Your Top Tracks</h2>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>{track.name} by {track.artists.map((artist: any) => artist.name).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}

export default TopTracks;