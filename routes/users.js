import express from "express";
import { createUser } from "../helper.js";
import { getUserByName } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

router.post("/login", async function (request, response) {
  // db.users.insertOne(data)
  const { username, password } = request.body;
  const userfromDB = await getUserByName(username);
  console.log(userfromDB);
  if (!userfromDB) {
    response.status(401).send({ message: "Invalid username or password" });
  } else {
    const storedPassword = userfromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log("Login Successful  " + isPasswordMatch);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: userfromDB._id }, process.env.SECRET_KEY);
      response.status(200).send({ message: "Login Successful", token: token });
    } else {
      response.status(401).send({ message: "Invalid username or password" });
    }
  }
});

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}
