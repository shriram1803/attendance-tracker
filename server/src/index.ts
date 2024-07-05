// @ts-ignore
import app from "./app.js";
import * as mongoose from "mongoose";
import { mongoUri, port } from "./config/index.js";

//@ts-ignore

const main = async () => {
  let server: any;

  mongoose.set("strictQuery", true);
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("--database connection successful--");
    })
    .catch((err) => {
      console.log("--error connecting to database---");
    });

  server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: any) => {
    console.log(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
      server.close();
    }
  });
};

main();