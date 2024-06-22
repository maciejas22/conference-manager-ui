import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  username: z.string().min(6, "Username must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
});

export { updateUserSchema };
