import { z } from "zod";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/avif",
  "image/webp",
];

//
// Auth
//

export const SignupFormSchema = z
  .object({
    picture: z
      .any()
      .optional()
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        `Max image size is 1MB.`
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png, .avif and .webp formats are supported."
      ),
    first_name: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long." })
      .trim(),
    last_name: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long." })
      .trim(),
    cin: z
      .string()
      .min(2, { message: "CIN must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long. " })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter. " })
      .regex(/[0-9]/, { message: "Contain at least one number. " })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character. ",
      })
      .trim(),

    confirmPassword: z
      .string()
      .min(8, { message: "Be at least 8 characters long. " }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long." })
    .trim(),
});

//
// Events
//

export const ParticipateInFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  id_event: z.string(),
});

export const AddEventFormSchema = z.object({
  picture: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .avif and .webp formats are supported."
    ),
  clubID: z.string(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  description: z
    .string()
    .min(2, { message: "Description must be at least 3 characters long." })
    .trim(),
  location: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters long." })
    .trim(),
  datetime: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date or time",
  }),
});

//
// Clubs
//

export const AddClubFormSchema = z.object({
  logo: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .avif and .webp formats are supported."
    ),
  background: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .avif and .webp formats are supported."
    ),
  presidentID: z.string(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  description: z
    .string()
    .min(2, { message: "Description must be at least 3 characters long." })
    .trim(),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters long." })
    .trim(),
});

export const EditClubMembershipFormSchema = z.object({
  membershipID: z.string(),
  status: z.string(),
});

//
// Users
//

export const ResetPasswordFormSchema = z
  .object({
    userID: z.string(),
    currentPassword: z.string({ message: "Password must not be null." }),
    newPassword: z
      .string()
      .min(8, { message: "Be at least 8 characters long. " })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter. " })
      .regex(/[0-9]/, { message: "Contain at least one number. " })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character. ",
      })
      .trim(),

    confirmPassword: z
      .string()
      .min(8, { message: "Be at least 8 characters long. " }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const ForgetPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});
