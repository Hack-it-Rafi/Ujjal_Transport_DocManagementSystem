import { z } from 'zod';
import { Types } from './Document.constant';

const addDocumentSchema = z.object({
    body: z.object({
        // imageUrl: z.string(),
        // imageUrl: z.instanceof(File),
        type: z.enum([...Types] as [string, ...string[]]),
        dateOfExpiry: z.string().nullable().optional(), 
    })
})

const updateDocumentSchema = z.object({
    body: z.object({
        // imageUrl: z.string(),
        // imageUrl: z.instanceof(File),
        // type: z.enum([...Types] as [string, ...string[]]),
        dateOfExpiry: z.string()
    })
})

export const DocumentValidation = {
    addDocumentSchema,
    updateDocumentSchema
}