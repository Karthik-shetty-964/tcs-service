import express from 'express';
import calculateTax from '../controllers/tax.controller';
import { validateJson } from '../middlewares/validation.middleware';
import bodyParser from 'body-parser';

const router = express.Router();

// Middleware to parse JSON and URL-encoded data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Routes
router.post('/tax', validateJson, calculateTax);

export default router;
