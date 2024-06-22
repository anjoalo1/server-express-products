import { z } from 'zod';


export const productEschema = z.object({
    name: z.string({
        invalid_type_error:'Product name must be a string',
        required_error:'Product name is required'
    }),
    year: z.number().int().positive().min(1900).max(2024)   
})

export function validateProduct(object){
    return productEschema.safeParse(object);
}

export function validatePartialProduct(object){
    return productEschema.partial().safeParse(object);
}