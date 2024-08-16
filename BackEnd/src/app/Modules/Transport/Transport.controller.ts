import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransportServices } from './Transport.service';
import { RequestHandler } from 'express';

const createTransport = catchAsync(async (req, res) => {
  const result = await TransportServices.createTransportIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transport is created successfully',
    data: result,
  });
});

const getAllTransports: RequestHandler = catchAsync(async (req, res) => {
  const result = await TransportServices.getAllTransportsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transports are retrieved successfully',
    data: result,
  });
});

const getSingleTransport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TransportServices.getSingleTransportFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transport is retrieved successfully',
    data: result,
  });
});

const updateTransport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const transport  = req.body;
  const result = await TransportServices.updateTransportIntoDB(
    id,
    transport,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transport is updated successfully',
    data: result,
  });
});

export const TransportControllers = {
  createTransport,
  getSingleTransport,
  getAllTransports,
  updateTransport
};
