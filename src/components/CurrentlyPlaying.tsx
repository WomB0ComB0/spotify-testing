import { useState, useEffect } from 'react';
import { getCurrentlyPlaying } from '../lib/spotify';

function CurrentlyPlaying({ token }: { token: string }) {
  // @ts-expect-error no need to specify type
  const [track, setTrack] = useState<any>(null); 

  useEffect(() => {
    if (token) {
      getCurrentlyPlaying(token).then(setTrack);
    }
  }, [token]);

  if (!track) return <div>No track currently playing</div>;

  return (
    <div>
      <h2>Currently Playing</h2>
      <p>{track.item.name} by {track.item.artists.map((a: any) => a.name).join(', ')}</p>
    </div>
  );
}

export default CurrentlyPlaying;