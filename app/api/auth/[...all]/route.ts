import { auth } from "@/lib/better-auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

if (!auth) {
  throw new Error('Auth not initialized');
}

export const { GET, POST } = toNextJsHandler(auth);
