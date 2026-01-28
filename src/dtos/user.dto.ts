import { z } from "zod";

export const CreateUserDTO = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    dob: z.string(),
    gender: z.enum(["male", "female"]),
    phone: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const LoginUserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
