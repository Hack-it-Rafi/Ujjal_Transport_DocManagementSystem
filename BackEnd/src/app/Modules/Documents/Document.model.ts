import { model, Schema } from 'mongoose';
import { TDocument } from './Document.interface';
import { Types } from './Document.constant';

const documentSchema = new Schema<TDocument>(
  {
    name:{
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    type:{
        type: String,
        required: true,
        enum: Types
    },
    vehicle:{
      type: String,
    },
    dateOfExpiry: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Document = model<TDocument>("Document", documentSchema);
