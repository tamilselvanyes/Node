import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { moviesRouter } from "./routes/movies.js";

const app = express();
dotenv.config();

//middleware --> Intercept --> Body to JSON
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

export const client = await createConnection();

app.get("/", function (req, res) {
  res.send("This is my new application using the express nodemon");
});

app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log(`Server started ${PORT}`));

//Very important code for mongo connection always just as it is.......

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌️😊");
  return client;
}
