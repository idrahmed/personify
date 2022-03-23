import handler from "../../../backend/handler";
import {
  getRecentlyPlayed,
  getRecommended,
  getTopArtists,
  getTopTracks,
} from "../../../backend/spotifyAPI";

const arrToStr = (arr) => {
  return arr.join(",");
};

// fetching recommendations for a user.
// they can be based on top tracks, recently played or top artists.

export default handler().get(async (req, res, next) => {
  const { index: type } = req.query;
  let seedType;
  let seedValues = [];

  // if seedType is top_tracks, fetch a users 5 top tracks and push them into seedValues.
  try {
    if (type === "top_tracks") {
      seedType = "seed_tracks";
      const {
        data: { items },
      } = await getTopTracks("medium_term", 5);
      items.map((track) => seedValues.push(track.id));
    }

    // if seedType is recent, fetch a users 5 recently plated tracks and push them into seedValues.
    else if (type === "recent") {
      seedType = "seed_tracks";
      const {
        data: { items },
      } = await getRecentlyPlayed(5);
      items.map((track) => seedValues.push(track.track.id));

      // if seedType is top_tracks, fetch a users 5 top artists and push them into seedValues.
    } else if (type === "top_artists") {
      seedType = "seed_artists";
      const {
        data: { items },
      } = await getTopArtists("medium_term", 5);
      items.map((track) => seedValues.push(track.id));
    }

    // if no seedValues exist, then return back early as we cannot provide any recommendations.
    if (!seedValues) {
      return res.status(200).json({ items: {} });
    }

    // comma seperate our seedValues.
    const commaSeparatedSeedVals = arrToStr(seedValues);

    // else now send a request to getRecommended endpoint and pass in our seedType as well as seedValues
    const {
      data: { tracks: items },
    } = await getRecommended(seedType, commaSeparatedSeedVals);

    // get back recommended tracks from spotify api. 
    const tracks = items.map((track) => ({
      id: track.id,
      title: track.name,
      uri: track.uri,
      subtitle: track.artists[0].name,
      images: track.album.images[2],
    }));

    return res.status(200).json({ tracks });
  } catch (err) {
    if (err.response) {
      return next(err.response.data.error);
    }
  }
});

// top artists - seed_artists
// top tracks, recent - seed_tracks
// discover - seed_genre
