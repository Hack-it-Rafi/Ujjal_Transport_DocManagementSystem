import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TransportValidation } from './Transport.validation';
import { TransportControllers } from './Transport.controller';

const router = express.Router();

router.post(
    '/add-transport',
    validateRequest(TransportValidation.addTransportValidationSchema),
    TransportControllers.createTransport
);

router.get('/:id', TransportControllers.getSingleTransport);

router.patch('/:id', validateRequest(TransportValidation.updateTransportValidationSchema), TransportControllers.updateTransport);

router.get('/', TransportControllers.getAllTransports);

export const TransportRoutes = router;