import { z } from "zod";
import { isoDateString } from "../utils/schema";

export const Commune = z.object({
  id: z.number(),
  bfsCode: z.number(),
  name: z.string(),
  canton: z.string(),
  createdAt: isoDateString(),
});
export type Commune = z.infer<typeof Commune>;
