import { Types } from "mongoose";

export type TTransport = {
    titleNumber: string;
    ownerName: string;
    description: string;
    imageUrl: string;
    taxDoc: Types.ObjectId;
    fitnessDoc: Types.ObjectId;
    registrationDoc: Types.ObjectId;
    routePermitDoc: Types.ObjectId;
    totalRemainingDays: number
}