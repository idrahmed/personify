import axios from "axios";
import { getToken } from "next-auth/jwt";

const spotifyInstance = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

const secret = process.env.NEXTAUTH_SECRET;

export const getAccessToken = async (req, res, next) => {
  const token = await getToken({ req, secret });
  if (token) {
    // Signed in
    req.accessToken = token.accessToken;
    req.id = token.id
    spotifyInstance.defaults.headers['Authorization'] = `Bearer ${token.accessToken}`
    next();
  } else {
    // Not Signed in
    return res.status(401).end();
  } 
}


export default spotifyInstance;
