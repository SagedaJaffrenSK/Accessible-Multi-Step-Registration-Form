import { z } from "zod";

export const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required").regex(/^\+?[0-9()\-\s]{7,20}$/, "Enter a valid phone number"),
  dob: z.string().min(1, "Date of birth is required").refine((val) => {
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return false;
    const age = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
    return age >= 18;
  }, "You must be at least 18 years old")
});

export const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required")
});

export const accountSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[a-z]/, "Must include lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include special character"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


export const schemasByStep = [personalSchema, addressSchema, accountSchema];
export const fullSchema = personalSchema.merge(addressSchema).merge(accountSchema);
