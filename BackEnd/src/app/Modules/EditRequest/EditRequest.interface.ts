export type TType = 'Tax' | 'Fitness' | 'Registration' | 'RoutePermit'

export type TEditRequest = {
    docId: string;
    editorName: string;
    vehicleName: string;
    imageUrl: string;
    type: TType;
    dateOfExpiry: Date;
    isDeleted?: boolean;
}