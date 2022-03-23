import handler from "../../../backend/handler";
import { createPlaylist, getCoverImage } from "../../../backend/spotifyAPI";
import { addTracks } from "../../../backend/spotifyAPI";

// this endpoint allows a user to create a playlist that will save to their spotify account. 

export default handler().post(async (req, res, next) => {
  const today = new Date().toISOString().slice(0, 10)
  const userId = req.id
  const name = `${req.body.newPlaylistData.name} ${today}`
  const uris = req.body.newPlaylistData.uris

  // a minimum of 4 tracks must be required to create a playlist
  if (uris.length < 4) {
    const error = {message: "At least 4 items needed", status: 422}
    throw error
  }
    try {
      const {data:{id, uri}} = await createPlaylist(userId, name) 
      await addTracks(id, uris)
      const {data: coverImage} = await getCoverImage(id)
      return res.status(201).json({ message: "Playlist created", id, uri, coverImage: coverImage[1] });
    } catch (err) {
      if (err.response) {
        return next(err.response.data.error);
      }
    }
  } 
 
);

