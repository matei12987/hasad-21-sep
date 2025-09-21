import { z } from 'zod';

export const validateSaudiMobile = (mobile: string): boolean => {
  const saudiMobileRegex = /^(\+966|966|0)?[5-9][0-9]{8}$/;
  return saudiMobileRegex.test(mobile);
};

export const contactSchema = z.object({
  contact_name: z.string().min(2, 'Name must be at least 2 characters'),
  contact_email: z.string().email('Invalid email address'),
  contact_mobile: z
    .string()
    .optional()
    .refine(val => !val || validateSaudiMobile(val), 'Invalid Saudi mobile number format'),
  contact_tel: z.string().optional(),
  contact_address: z.string().optional(),
  contact_postcode: z.string().optional(),
  contact_city: z.string().optional(),
  contact_country: z.string().optional(),
  contact_nationality: z.string().optional(),
  contact_type: z.enum(['consumer', 'institutional', 'corporate']),
});

export type ContactFormData = z.infer<typeof contactSchema>;
