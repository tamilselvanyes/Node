import express from "express";
import {
  getAllmovies,
  createMovies,
  updateMovieByid,
  deleteMovieByid,
  getMovieByid,
} from "../helper.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
export const moviesRouter = router;
//movies[req.params.id]
//find will retun cursor only so we have to convert into an array using toArray() method
router.get("", auth, async (req, res) => {
  const movies = await getAllmovies();
  //console.log(movies);
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const movie = await getMovieByid(id);
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "No such movie found" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = await deleteMovieByid(id);
  res.send(result);
});

//This is the class code

router.put("/:id", async function (request, response) {
  console.log(request.params);

  // db.movies.updateOne({id: "102"}, {$set: upadateData})
  const { id } = request.params;
  const updateData = request.body;

  const result = await updateMovieByid(id, updateData);
  response.send(result);
});

router.post("", async function (request, response) {
  // db.movies.insertMany(data)
  const data = request.body;
  console.log(data);
  const result = await createMovies(data);
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
