import QueryBuilder from '../../builder/QueryBuilder';
import { TDocument } from './Document.interface';
import { Document } from './Document.model';

const createDocumentIntoDB = async (payload: TDocument) => {
  const result = await Document.create(payload);
  return result;
};

const getAllDocumentsFromDB = async (query: Record<string, unknown>) => {
  const documentQuery = new QueryBuilder(Document.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await documentQuery.modelQuery;
  return result;
};

const getSingleDocumentFromDB = async (id: string) => {
  const result = await Document.findById(id);
  return result;
};

const updateDocumentIntoDB = async (
  id: string,
  payload: Partial<TDocument>,
) => {
  const result = await Document.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const DocumentServices = {
  createDocumentIntoDB,
  getAllDocumentsFromDB,
  getSingleDocumentFromDB,
  updateDocumentIntoDB,
};
