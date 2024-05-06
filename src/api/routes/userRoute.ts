import * as controller from '../controllers/userController';
import express from 'express';
import cors from 'cors';
import {corsOptions} from '../../index';

export const router = express.Router();

router.get('/api/stock', cors(corsOptions), controller.getCompanyPrice);
