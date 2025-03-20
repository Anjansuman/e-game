import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(2).max(50),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6),
    gamertag: z.string().min(3).max(50).optional()
});

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
