import * as controller from '../controllers/userController';
import express from 'express';
import cors from 'cors';
import {corsOptions} from '../../index';

export const router = express.Router();

router.get('/api/stock', cors(corsOptions), controller.getCompanyPrice);
router.get('/api/companies', cors(corsOptions), controller.getCompanies);
router.get('/api/summary/:company', cors(corsOptions), controller.getSummary);
