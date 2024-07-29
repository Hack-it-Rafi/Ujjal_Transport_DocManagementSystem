import { model, Schema } from 'mongoose';
import { TTransport } from './Transport.interface';
import { Types } from './Transport.constant';

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
    type:{
      type: String,
      required: true,
      enum: Types
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
    }
  },
  {
    timestamps: true,
  },
);

export const Transport = model<TTransport>('Transport', transportSchema);
