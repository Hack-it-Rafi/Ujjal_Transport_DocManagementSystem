import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DocumentValidation } from './Document.validation';
import { DocumentControllers } from './Document.controller';
import multer from 'multer';
import path from 'path';
import auth from '../../middlewares/auth';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'DocumentImages/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Ensure the correct file extension
    }
  });
  
  const upload = multer({ storage });

router.post(
    '/add-document',
    auth('admin'),
    upload.single('image'), // handle file upload
    validateRequest(DocumentValidation.addDocumentSchema),
    DocumentControllers.createDocument
);

router.get('/', auth('admin','editor'), DocumentControllers.getAllDocuments);

router.get('/:id', auth('admin','editor'), DocumentControllers.getSingleDocument);

router.patch(
    '/:id',
    auth('admin'),
    upload.single('documentImage'), // handle file upload
    validateRequest(DocumentValidation.updateDocumentSchema), // your schema for validation
    DocumentControllers.updateDocument
  );

router.get('/file/:id', auth('admin','editor'), DocumentControllers.getDocumentFile);

export const DocumentRoutes = router;
