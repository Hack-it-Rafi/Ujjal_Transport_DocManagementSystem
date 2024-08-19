import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EditRequestValidation } from './EditRequest.validation';
import { EditRequestControllers } from './EditRequest.controller';
import multer from 'multer';
import auth from '../../middlewares/auth';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'EditImages/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post(
    '/add-editRequest',
    auth('admin','editor'),
    upload.single('image'), // handle file upload
    validateRequest(EditRequestValidation.addEditRequestSchema),
    EditRequestControllers.createEditRequest
);

router.get('/', auth('admin'), EditRequestControllers.getAllEditRequests);

router.get('/:id', auth('admin'),EditRequestControllers.getSingleEditRequest);

router.get('/file/:id', auth('admin'), EditRequestControllers.getDocumentFile);

router.delete('/:id', auth('admin'), EditRequestControllers.deleteEditRequest);

export const EditRequestRoutes = router;