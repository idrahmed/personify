import handler from "../../../backend/handler";
import { getDiscoverPopular } from "../../../backend/spotifyAPI";

// get back 20 latest popular songs of the pop genre. 

export default handler().get(async (req, res, next) => {
  try {
    const {data: {tracks}} = await getDiscoverPopular(20);

    const items = tracks.map((track) => ({
      id: track.id,
      title: track.name,
      uri: track.uri,
      subtitle: track.artists[0].name,
      images: track.album.images[1],
    }));
    
    return res.status(200).json({items});
  } catch (err) {
    if (err.response) {
      return next(err.response.data.error)
    }
  }
});
