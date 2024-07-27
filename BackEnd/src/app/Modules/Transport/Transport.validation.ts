import { z } from 'zod';

const addTransportValidationSchema = z.object({
    body: z.object({
        titleNumber: z.string(),
        ownerName: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        taxDoc: z.string().optional(),
        fitnessDoc: z.string().optional(),
        registrationDoc: z.string(),
        routePermitDoc: z.string().optional(),
    })
});

export const TransportValidation = {
    addTransportValidationSchema
}