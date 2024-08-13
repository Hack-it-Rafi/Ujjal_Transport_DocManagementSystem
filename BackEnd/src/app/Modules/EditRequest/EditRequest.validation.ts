import { z } from 'zod';
import { Types } from './EditRequest.constant';

const addEditRequestSchema = z.object({
    body: z.object({
        docId:z.string(),
        editorEmail: z.string(),
        vehicleName: z.string(),
        imageUrl: z.string(),
        type: z.enum([...Types] as [string, ...string[]]),
        dateOfExpiry: z.string()
    })
})

export const EditRequestValidation = {
    addEditRequestSchema
}