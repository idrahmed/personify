import nc from "next-connect";
import { getAccessToken } from "./axios";

// handler that uses the getAccessToken middleware and has an onError fn that handles errors we throw. 
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
