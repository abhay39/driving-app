import express from 'express';
import { createNewAccount, getUserDetails, userLogin, verifyAccount } from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.get('/listOfUsers', async(req, res) => {
  res.status(200).json({ message: 'Welcome to the List of users' });
});

userRoutes.post("/create-new-account",createNewAccount);
userRoutes.post("/verify-new-account",verifyAccount);
userRoutes.get("/get-current-user-details/:token",getUserDetails);
userRoutes.post("/login-user",userLogin);

export default userRoutes;