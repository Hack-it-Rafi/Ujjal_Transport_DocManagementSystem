import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EditRequestValidation } from './EditRequest.validation';
import { EditRequestControllers } from './EditRequest.controller';
import multer from 'multer';

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
    upload.single('image'), // handle file upload
    validateRequest(EditRequestValidation.addEditRequestSchema),
    EditRequestControllers.createEditRequest
);

router.get('/', EditRequestControllers.getAllEditRequests);

router.get('/:id', EditRequestControllers.getSingleEditRequest);

router.get('/file/:id', EditRequestControllers.getDocumentFile);

router.delete('/:id', EditRequestControllers.deleteEditRequest);

export const EditRequestRoutes = router;