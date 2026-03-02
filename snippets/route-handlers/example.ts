import { z } from "zod";
import { defineValidatedEventHandler } from "./validation.ts";

export default defineValidatedEventHandler({}, (event) => {
  return `Hello`;
});
