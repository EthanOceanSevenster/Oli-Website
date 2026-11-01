import { z } from 'zod';

const email = z
  .string()
  .trim()
  .min(1, 'An email address is required.')
  .max(254)
  .email('That does not look like an email address.')
  .transform((value) => value.toLowerCase());

export const registerSchema = z.object({
  email,
  password: z
    .string()
    .min(8, 'Choose a password of at least 8 characters.')
    .max(200, 'That password is too long.'),
  firstName: z.string().trim().max(100).optional().default(''),
  lastName: z.string().trim().max(100).optional().default(''),
  grade: z.enum(['9', '10', '11', '12']).optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be an ISO date, for example 2009-04-12.')
    .refine((value) => !Number.isNaN(Date.parse(value)), 'That date does not exist.')
    .optional(),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'A password is required.').max(200),
});

export const progressSchema = z.object({
  /** The prototype's blob, stored verbatim — we check the envelope, not the shape. */
  data: z.record(z.string(), z.unknown()),
});

/** Turns a Zod failure into the single clearest sentence for the front end. */
export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'That request could not be understood.';
}
