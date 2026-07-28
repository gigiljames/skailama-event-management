import z from "zod";
import { MESSAGES } from "../constants/messages.js";

export const envSchema = z.object({
  PORT: z.coerce
    .number({ error: MESSAGES.ENV.PORT_ERROR })
    .min(1024, { error: MESSAGES.ENV.PORT_ERROR })
    .max(65535, { error: MESSAGES.ENV.PORT_ERROR }),
  NODE_ENV: z.enum(["development", "production"], {
    error: MESSAGES.ENV.NODE_ENV_ERROR,
  }),
  FRONTEND_URL: z.string({ error: MESSAGES.ENV.FRONTEND_URL_ERROR }),
  DB_URL: z.string({ error: MESSAGES.ENV.DB_URL_ERROR }),
});
