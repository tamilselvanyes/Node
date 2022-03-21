import express from "express";
import { createUser } from "../helper.js";
import bcrypt from "bcrypt";

const router = express.Router();
export const usersRouter = router;

router.post("/signup", async function (request, response) {
  // db.users.insertOne(data)
  const { username, password } = request.body;
  const hashedpassword = await genPassword(password);
  const new_user = {
    username: username,
    password: hashedpassword,
  };
  console.log(username + hashedpassword);
  const result = await createUser(new_user);
  response.send(result);
});

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}
