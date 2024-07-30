import { model, Schema } from "mongoose";
import { Types } from "./EditRequest.constant";
import { TEditRequest } from "./EditRequest.interface";

const editRequestSchema = new Schema<TEditRequest>(
    {
      docId:{
        type: String,
        required: true
      },
      editorName:{
        type:String,
        required: true
      },
      vehicleName:{
        type:String,
        required:true
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
      dateOfExpiry: {
        type: Date,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  );
  
  export const EditRequest = model<TEditRequest>("EditRequest", editRequestSchema);