import { z } from "zod";

export const userSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.enum(["Male", "Female"]),
    role: z.enum(["Admin", "Staff", "User"]),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
