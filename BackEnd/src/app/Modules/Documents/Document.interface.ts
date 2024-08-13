export type TType = 'Tax' | 'Fitness' | 'Registration' | 'RoutePermit'

export type TDocument = {
    imageUrl: string;
    type: TType;
    vehicle: string;
    dateOfExpiry: Date;
}