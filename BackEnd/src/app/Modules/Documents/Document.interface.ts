export type TType = 'Tax' | 'Fitness' | 'Registration' | 'RoutePermit' | 'Other'

export type TDocument = {
    name: string;
    imageUrl: string;
    type: TType;
    vehicle: string;
    dateOfExpiry: Date;
}