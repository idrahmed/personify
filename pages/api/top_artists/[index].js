import handler from "../../../backend/handler";
import { getTopArtists } from "../../../backend/spotifyAPI";

export default handler().get(async (req, res, next) => {
  const { index: time_range } = req.query;
  try {
    const {data: {items}} = await getTopArtists(time_range);

    const tracks = items.map((artist) => ({
      id: artist.id,
      title: artist.name,
      uri: artist.uri,
      subtitle: artist.genres.join(", "),
      images: artist.images[2],
    }));
    
    return res.status(200).json({tracks});
  } catch (err) {
    if (err.response) {
      return next(err.response.data.error)
    }
  }
});
