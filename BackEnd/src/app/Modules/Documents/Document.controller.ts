import httpStatus from 'http-status';
import { DocumentServices } from './Document.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

const createDocument = catchAsync(async (req, res) => {
  const fileData = req.file ? { imageUrl: req.file.path } : {};
  const documentData = { ...req.body, ...fileData };
  const result = await DocumentServices.createDocumentIntoDB(documentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document is created successfully',
    data: result,
  });
});

const getAllDocuments: RequestHandler = catchAsync(async (req, res) => {
  const result = await DocumentServices.getAllDocumentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Documents are retrieved successfully',
    data: result,
  });
});

const getSingleDocument = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DocumentServices.getSingleDocumentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document is retrieved successfully',
    data: result,
  });
});

const getDocumentFile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const document = await DocumentServices.getSingleDocumentFromDB(id);

  if (!document || !document.imageUrl) {
    return res.status(404).send('File not found');
  }

  res.contentType('image/jpeg');
  fs.createReadStream(document.imageUrl).pipe(res);
});

const updateDocument = catchAsync(async (req, res) => {
  const { id } = req.params;

  const existingDocument = await DocumentServices.getSingleDocumentFromDB(id);

  if (!existingDocument) {
    return res.status(404).json({ message: "Document not found" });
  }

  if (req.file) {
    const newImagePath = req.file.path;

    if (existingDocument.imageUrl) {
      const oldImagePath = path.join(process.cwd(), existingDocument.imageUrl);

      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to delete old image:', error);
      }
    }

    const updatedDocumentData = {
      ...req.body, 
      imageUrl: newImagePath, 
    };

    const result = await DocumentServices.updateDocumentIntoDB(id, updatedDocumentData);

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Document updated successfully, and old image replaced',
      data: result,
    });
  } else {
    const result = await DocumentServices.updateDocumentIntoDB(id, req.body);

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Document updated successfully',
      data: result,
    });
  }
});

export const DocumentControllers = {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  updateDocument,
  getDocumentFile, 
};
