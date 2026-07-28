import z from "zod";

export const eventSchema = z.object({
  id: z.string().optional(),
  profiles: z.array(z.string()).min(1),
  timezone: z.string().trim().min(1),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
});
