import {z} from 'zod';

export const changePasswordSchema = z.object({
    email: z.string().email(),
    confirmPassword: z.string(),
    newPassword: z.string(),
    oldPassword: z.string(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const editProfileSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.enum(["Male", "Female"]), 
  password: z.string(),
});

export const signupSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.enum(["Male", "Female"]),  
  confirmPassword: z.string(),
  password: z.string(),
});

export const roleChangeSchema = z.object({
  email: z.string(),
  role: z.enum(["Admin", "Staff", "User"]),
})