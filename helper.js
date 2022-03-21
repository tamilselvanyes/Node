import { client } from "./index.js";

export function getAllmovies() {
  return client.db("b30wd").collection("movies").find({}).toArray();
}

export function createMovies(data) {
  return client.db("b30wd").collection("movies").insertMany(data);
}

export function updateMovieByid(id, updateData) {
  return client
    .db("b30wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: updateData });
}

export function deleteMovieByid(id) {
  return client.db("b30wd").collection("movies").deleteOne({ id: id });
}

export function getMovieByid(id) {
  return client.db("b30wd").collection("movies").findOne({ id: id });
}

export function createUser(data) {
  return client.db("b30wd").collection("users").insertOne(data);
}

export function getUserByName(username) {
  return client.db("b30wd").collection("users").findOne({ username: username });
}
