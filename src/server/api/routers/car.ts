import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const carRouter = createTRPCRouter({
  getCarInfos: publicProcedure
    .input(
      z.object({
        carId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const car = await ctx.prisma.car.findUnique({
        where: {
          id: input.carId,
        },
      });
      return car;
    }),

  getCarPosts: publicProcedure
    .input(
      z.object({
        carId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.carPost.findMany({
        where: {
          carId: input.carId,
        },
        include: {
          pictures: true,
          postCategory: true,
        },
        orderBy: {
          dateOfRepair: "asc",
        },
      });
      return posts;
    }),
});
