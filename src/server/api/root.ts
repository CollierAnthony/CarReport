import { createTRPCRouter } from "~/server/api/trpc";
import { garageRouter } from "./routers/garage";
import { postCategoryRouter } from "./routers/postCategory";
import { carRouter } from "./routers/car";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  garage: garageRouter,
  postCategory: postCategoryRouter,
  car: carRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
