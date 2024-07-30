import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EditRequestValidation } from './EditRequest.validation';
import { EditRequestControllers } from './EditRequest.controller';

const router = express.Router();

router.post(
    '/add-editRequest',
    validateRequest(EditRequestValidation.addEditRequestSchema),
    EditRequestControllers.createEditRequest
);

router.get('/', EditRequestControllers.getAllEditRequests);

router.get('/:id', EditRequestControllers.getSingleEditRequest);

router.delete('/:id', EditRequestControllers.deleteEditRequest);

export const EditRequestRoutes = router;