import dotenv from "dotenv";

dotenv.config();

export default {
    env: {
      REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    },
  };