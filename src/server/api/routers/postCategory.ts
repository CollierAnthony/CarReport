import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postCategoryRouter = createTRPCRouter({
  getUserCategories: publicProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const carCategories = await ctx.prisma.postCategory.findMany({
      where: {
        OR: [{ userId: userId }, { isDefault: true }],
      },
    });
    return carCategories;
  }),

  addCarCategory: privateProcedure
    .input(
      z.object({
        title: z.string().min(2).max(255),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const newCategory = await ctx.prisma.postCategory.create({
        data: {
          userId: userId,
          title: input.title,
        },
      });
      return newCategory;
    }),
});
