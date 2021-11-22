import nc from "next-connect";
import { getAccessToken } from "./axios";

export default function handler() {
  return nc({
    onError(error, req, res, next) {
      console.log(error)
      const status = error.status || 500
      const message = error.message
      return res.status(status).json({message, status})
    }
  }).use(getAccessToken);
}
