import handler from "../../../backend/handler";
import { getRecentlyPlayed } from "../../../backend/spotifyAPI";

// get recently played tracks for a user. 

export default handler().get(async (req, res, next) => {
  try {
    const {data: {items}} = await getRecentlyPlayed();
    const tracks = items.map((item) => ({
      id: item.track.id,
      title: item.track.name,
      uri: item.track.uri,
      subtitle: item.track.artists[0].name,
      images: item.track.album.images[2],
      played_at: item.played_at,
    }));
    
    return res.status(200).json({tracks});
  } catch (err) {
    if (err.response) {
      return next(err.response.data.error)
    }
  }
});