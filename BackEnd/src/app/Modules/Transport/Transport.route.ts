import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TransportValidation } from './Transport.validation';
import { TransportControllers } from './Transport.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/add-transport',
    auth('admin'),
    validateRequest(TransportValidation.addTransportValidationSchema),
    TransportControllers.createTransport
);

router.get('/:id', auth('admin','editor'), TransportControllers.getSingleTransport);

router.patch('/:id', auth('admin'), validateRequest(TransportValidation.updateTransportValidationSchema), TransportControllers.updateTransport);

router.get('/', auth('admin','editor'), TransportControllers.getAllTransports);

export const TransportRoutes = router;