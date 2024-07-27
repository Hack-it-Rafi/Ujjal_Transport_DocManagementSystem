import { model, Schema } from 'mongoose';
import { TTransport } from './Transport.interface';

const transportSchema = new Schema<TTransport>(
  {
    titleNumber: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Vehicle number is required'],
    },
    ownerName: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    taxDoc: {
      type: Schema.Types.ObjectId,
      ref: 'TaxDoc',
    },
    fitnessDoc: {
      type: Schema.Types.ObjectId,
      ref: 'FitnessDoc',
    },
    registrationDoc: {
      type: Schema.Types.ObjectId,
      ref: 'RegistrationDoc',
    },
    routePermitDoc: {
      type: Schema.Types.ObjectId,
      ref: 'RoutePermitDoc',
    },
    totalRemainingDays:{
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  },
);

export const Transport = model<TTransport>('Transport', transportSchema);
