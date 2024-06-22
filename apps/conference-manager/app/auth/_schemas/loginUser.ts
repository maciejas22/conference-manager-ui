import { z } from "zod";

const loginUserSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export { loginUserSchema };
