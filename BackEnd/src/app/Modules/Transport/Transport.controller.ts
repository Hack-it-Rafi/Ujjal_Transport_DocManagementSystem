import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransportServices } from './Transport.service';

const createTransport = catchAsync(async (req, res) => {
  const result = await TransportServices.createTransportIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transport is created successfully',
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

export const TransportControllers = {
    createTransport,
    getSingleTransport
}
