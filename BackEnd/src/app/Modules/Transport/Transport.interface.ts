import { Types } from "mongoose";
export type TType = 'PickUp' | 'Truck' | 'Motorcycle'

export type TTransport = {
    titleNumber: string;
    ownerName: string;
    type: TType;
    description: string;
    imageUrl: string;
    taxDoc: Types.ObjectId;
    fitnessDoc: Types.ObjectId;
    registrationDoc: Types.ObjectId;
    routePermitDoc: Types.ObjectId;
}