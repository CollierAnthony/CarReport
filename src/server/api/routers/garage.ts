import dayjs from "dayjs";
import { z } from "zod";
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

  addCarToGarage: privateProcedure
    .input(
      z.object({
        make: z.string().min(2).max(280),
        model: z.string().min(2).max(280),
        year: z.number().min(1900).max(dayjs().year()),
        mileage: z.number().min(0).max(1000000),
        buyDate: z.date().min(new Date("1900-01-01")).max(new Date()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const newCar = await ctx.prisma.car.create({
        data: {
          owner: userId,
          make: input.make,
          model: input.model,
          year: input.year,
          mileage: input.mileage,
        },
      });

      return newCar;
    }),
});
