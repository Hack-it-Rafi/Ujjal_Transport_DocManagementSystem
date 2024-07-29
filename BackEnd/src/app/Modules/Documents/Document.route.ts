import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DocumentValidation } from './Document.validation';
import { DocumentControllers } from './Document.controller';

const router = express.Router();

router.post(
    '/add-document',
    validateRequest(DocumentValidation.addDocumentSchema),
    DocumentControllers.createDocument
);

router.get('/', DocumentControllers.getAllDocuments);

router.get('/:id', DocumentControllers.getSingleDocument);

export const DocumentRoutes = router;