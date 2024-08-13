import QueryBuilder from '../../builder/QueryBuilder';
// import { Document } from '../Documents/Document.model';
import { TransportSearchableFields } from './Transport.constant';
import { TTransport } from './Transport.interface';
import { Transport } from './Transport.model';

const createTransportIntoDB = async (payload: TTransport) => {
  const result = await Transport.create(payload);
  return result;
};

const getAllTransportsFromDB = async (query: Record<string, unknown>) => {
  const transportQuery = new QueryBuilder(Transport.find().populate('taxDoc').populate('fitnessDoc').populate('registrationDoc').populate('routePermitDoc'), query)
    .search(TransportSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await transportQuery.modelQuery;

  // Fetch the related documents for each transport
  // const result1 = await Promise.all(
  //   result.map(async (transport) => {
  //     const taxDoc = await Document.findById(transport.taxDoc).lean();
  //     const fitnessDoc = await Document.findById(transport.fitnessDoc).lean();
  //     const registrationDoc = await Document.findById(
  //       transport.registrationDoc,
  //     ).lean();
  //     const routePermitDoc = await Document.findById(
  //       transport.routePermitDoc,
  //     ).lean();

  //     const totalDays =
  //       (taxDoc?.totalDays || 0) +
  //       (fitnessDoc?.totalDays || 0) +
  //       (registrationDoc?.totalDays || 0) +
  //       (routePermitDoc?.totalDays || 0);

  //     return {
  //       ...transport,
  //       totalDays,
  //     } as TTransport & { totalDays: number };
  //   }),
  // );

  // result1.sort((a, b) => b.totalDays - a.totalDays);

  return result;
};

const getSingleTransportFromDB = async (id: string) => {
  const result = await Transport.findById(id).populate('taxDoc').populate('fitnessDoc').populate('registrationDoc').populate('routePermitDoc');
  return result;
};

const updateTransportIntoDB = async (
  id: string,
  payload: Partial<TTransport>,
) => {
  const result = await Transport.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const TransportServices = {
  createTransportIntoDB,
  getSingleTransportFromDB,
  getAllTransportsFromDB,
  updateTransportIntoDB,
};
