import express from 'express';
import { registerRiderAccount } from '../controllers/rider.controller.js';

const riderRoutes = express.Router();

riderRoutes.get('/listOfRiders', async(req, res) => {
  res.status(200).json({ message: 'Welcome to the List of riders' });
});

riderRoutes.post("/create-new-account",registerRiderAccount)

export default riderRoutes;