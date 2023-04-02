// Importing the required modules.
import express from 'express';
import { signin, signup } from '../controllers/auth.js';

// Creating a router instance.
const router = express.Router();

// Defining the routes for user sign up and sign in.
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
