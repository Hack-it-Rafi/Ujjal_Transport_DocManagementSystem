import httpStatus from 'http-status';
import { EditRequestServices } from './EditRequest.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { RequestHandler } from 'express';

const createEditRequest = catchAsync(async (req, res) => {
  const result = await EditRequestServices.createEditRequestIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EditRequest is created successfully',
    data: result,
  });
});

const getAllEditRequests: RequestHandler = catchAsync(async (req, res) => {
  const result = await EditRequestServices.getAllEditRequestsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EditRequests are retrieved successfully',
    data: result,
  });
});

const getSingleEditRequest = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EditRequestServices.getSingleEditRequestFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EditRequest is retrieved successfully',
    data: result,
  });
});


const deleteEditRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EditRequestServices.deleteEditRequestFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'EditRequest is deleted successfully',
      data: result,
    });
  });



export const EditRequestControllers = {
  createEditRequest,
  getAllEditRequests,
  getSingleEditRequest,
  deleteEditRequest
};
