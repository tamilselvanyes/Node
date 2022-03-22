import { client } from "./index.js";
import { ObjectId } from "mongodb";

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
    .updateOne({ _id: ObjectId(id) }, { $set: updateData });
}

export function deleteMovieByid(id) {
  return client
    .db("b30wd")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}

export function getMovieByid(id) {
  return client
    .db("b30wd")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

export function createUser(data) {
  return client.db("b30wd").collection("users").insertOne(data);
}

export function getUserByName(username) {
  return client.db("b30wd").collection("users").findOne({ username: username });
}
