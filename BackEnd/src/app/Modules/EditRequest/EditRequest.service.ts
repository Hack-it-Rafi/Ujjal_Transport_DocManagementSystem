import QueryBuilder from '../../builder/QueryBuilder';
import { TEditRequest } from './EditRequest.interface';
import { EditRequest } from './EditRequest.model';
import fs from 'fs/promises';

const createEditRequestIntoDB = async (payload: TEditRequest) => {
  const result = await EditRequest.create(payload);
  return result;
};

const getAllEditRequestsFromDB = async (query: Record<string, unknown>) => {
  const editRequestQuery = new QueryBuilder(EditRequest.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await editRequestQuery.modelQuery;
  return result;
};

const getSingleEditRequestFromDB = async (id: string) => {
  const result = await EditRequest.findById(id);
  return result;
};

const deleteEditRequestFromDB = async (id: string) => {
  const editRequest = await EditRequest.findById(id);

  if (!editRequest) {
    throw new Error('EditRequest not found');
  }

  if (editRequest.imageUrl) {
    try {
      await fs.unlink(editRequest.imageUrl); 
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error deleting image:', err); 
    }
  }

  const result = await EditRequest.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );

  return result;
};

export const EditRequestServices = {
  createEditRequestIntoDB,
  getAllEditRequestsFromDB,
  getSingleEditRequestFromDB,
  deleteEditRequestFromDB
};