import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();
dotenv.config();

//middleware --> Intercept --> Body to JSON
app.use(express.json());

const PORT = 3000;
// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

// mongodb+srv://moviesdatabase:<password>@cluster0.5z5jl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority--
const client = await createConnection();

//movies[req.params.id]
//find will retun cursor only so we have to convert into an array using toArray() method
app.get("/movies", async (req, res) => {
  const movies = await client
    .db("b30wd")
    .collection("movies")
    .find({})
    .toArray();
  //console.log(movies);
  res.send(movies);
});

app.get("/", function (req, res) {
  res.send("This is my new application using the express nodemon");
});

app.get("/movies/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const movie = await client
    .db("b30wd")
    .collection("movies")
    .findOne({ id: id });
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "No such movie found" });
});

app.delete("/movies/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = await client
    .db("b30wd")
    .collection("movies")
    .deleteOne({ id: id });
  res.send(result);
});

//This is the class code

app.put("/movies/:id", async function (request, response) {
  console.log(request.params);

  // db.movies.updateOne({id: "102"}, {$set: upadateData})
  const { id } = request.params;
  const updateData = request.body;

  const result = await client
    .db("b30wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: updateData });
  response.send(result);
});

// app.put("/movies/:id", async (req, res) => {
//   //   db.movies.updateOne({id:id},{$set:{rating:9}})

//   const id = req.params.id;
//   console.log(id);
//   const updateData = request.body;
//   const result = await client
//     .db("b30wd")
//     .collection("movies")
//     .updateOne({ id: id }, { $set: updateData });

//   res.send(result);
// });

app.post("/movies", async function (request, response) {
  // db.movies.insertMany(data)
  const data = request.body;
  console.log(data);
  const result = await client.db("b30wd").collection("movies").insertMany(data);
  response.send(result);
});

app.listen(PORT, () => console.log(`Server started ${PORT}`));

//Very important code for mongo connection always just as it is.......

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌️😊");
  return client;
}
