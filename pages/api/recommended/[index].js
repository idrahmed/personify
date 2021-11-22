import handler from "../../../backend/handler";
import { getRecentlyPlayed, getRecommended, getTopArtists, getTopTracks } from "../../../backend/spotifyAPI";

const arrToStr = (arr) => {
  return arr.join(',')
}

export default handler().get(async (req, res, next) => {
  const { index: type } = req.query;
  let seedType;
  let seedValues = [];

  try {
    if (type === 'top_tracks') {
      seedType = 'seed_tracks'
      const {data: {items}} = await getTopTracks('medium_term', 5);
      items.map((track) => (
        seedValues.push(track.id)
    ))
  }
  else if (type === 'recent') {
    seedType = 'seed_tracks'
    const {data: {items}} = await getRecentlyPlayed(5);
      items.map((track) => (
        seedValues.push(track.track.id)
    )) 
  } else if (type === 'top_artists') {
    seedType = 'seed_artists'
    const {data: {items}} = await getTopArtists('medium_term', 5);
      items.map((track) => (
        seedValues.push(track.id)
    )) 
  }
    const commaSeparatedSeedVals = arrToStr(seedValues)

    if (!commaSeparatedSeedVals) {
      return res.status(200).json({items: {}})
    }

    const {data: {tracks: items}} = await getRecommended(seedType, commaSeparatedSeedVals);
  
    const tracks = items.map((track) => ({
      id: track.id,
      title: track.name,
      uri: track.uri,
      subtitle: track.artists[0].name,
      images: track.album.images[2],
    }));
    
    return res.status(200).json({tracks});

  } catch (err) {
    if (err.response) {
      return next(err.response.data.error)
    }
  }
});

// top artists - seed_artists
// top tracks, recent - seed_tracks
// discover - seed_genre
