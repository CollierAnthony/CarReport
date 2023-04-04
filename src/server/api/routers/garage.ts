import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const garageRouter = createTRPCRouter({
  getUserGarage: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const garage = await ctx.prisma.car.findMany({
      where: {
        owner: userId,
      },
    });
    return garage;
  }),
});
