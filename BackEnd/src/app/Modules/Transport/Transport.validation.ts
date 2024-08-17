import { z } from 'zod';

const addTransportValidationSchema = z.object({
    body: z.object({
        titleNumber: z.string(),
        ownerName: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        taxDoc: z.string().nullable().optional(),
        fitnessDoc: z.string().nullable().optional(),
        registrationDoc: z.string().nullable().optional(),
        routePermitDoc: z.string().nullable().optional(),
    })
});
const updateTransportValidationSchema = z.object({
    body: z.object({
        titleNumber: z.string().optional(),
        ownerName: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
    })
});

export const TransportValidation = {
    addTransportValidationSchema,
    updateTransportValidationSchema
}