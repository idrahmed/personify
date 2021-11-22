import handler from "../../../backend/handler";
import { getTopTracks } from "../../../backend/spotifyAPI";

export default handler().get(async (req, res, next) => {
  const { index: time_range } = req.query;
  try {
    const {data: {items}} = await getTopTracks(time_range);

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
