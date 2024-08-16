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

  // Fetch the document from the database to get the old image URL
  const existingDocument = await DocumentServices.getSingleDocumentFromDB(id);

  if (!existingDocument) {
    return res.status(404).json({ message: "Document not found" });
  }

  // Check if a new file is provided
  if (req.file) {
    // Get the path of the new file
    const newImagePath = req.file.path;

    // Delete the old image file if it exists
    if (existingDocument.imageUrl) {
      const oldImagePath = path.join(process.cwd(), existingDocument.imageUrl);

      try {
        // Check if the file exists before trying to delete
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Deleted old image: ${oldImagePath}`);
        }
      } catch (error) {
        console.error('Failed to delete old image:', error);
      }
    }

    // Update the document in the database with the new image path
    const updatedDocumentData = {
      ...req.body, // Other fields like dateOfExpiry
      imageUrl: newImagePath, // New image path
    };

    // Save the updated document
    const result = await DocumentServices.updateDocumentIntoDB(id, updatedDocumentData);

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Document updated successfully, and old image replaced',
      data: result,
    });
  } else {
    // If no new image is provided, just update the document with the other fields
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
