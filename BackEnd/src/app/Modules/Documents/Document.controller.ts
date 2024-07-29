import httpStatus from 'http-status';
import { DocumentServices } from './Document.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { RequestHandler } from 'express';

const createDocument = catchAsync(async (req, res) => {
  const result = await DocumentServices.createDocumentIntoDB(req.body);

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

const updateDocument = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const { student } = req.body;
    const result = await DocumentServices.updateDocumentIntoDB(
      studentId,
      student,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Document is updated successfully',
      data: result,
    });
  });

export const DocumentControllers = {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  updateDocument
};
