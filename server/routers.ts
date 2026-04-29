import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createBooking, getBookingsByUserId, getAllBookings, updateBooking, deleteBooking } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  bookings: router({
    create: protectedProcedure
      .input(z.object({
        productName: z.string().min(1),
        bookingDate: z.date().or(z.string().transform(s => new Date(s))),
        location: z.string().min(1),
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const booking = await createBooking({
          userId: ctx.user.id,
          productName: input.productName,
          bookingDate: new Date(input.bookingDate),
          location: input.location,
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          status: "pending",
        });
        if (!booking) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return booking;
      }),
    myBookings: protectedProcedure.query(async ({ ctx }) => {
      return await getBookingsByUserId(ctx.user.id);
    }),
    all: protectedProcedure
      .use(async ({ ctx, next }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return next();
      })
      .query(async () => {
        return await getAllBookings();
      }),
    updateStatus: protectedProcedure
      .use(async ({ ctx, next }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return next();
      })
      .input(z.object({ id: z.number(), status: z.enum(["pending", "confirmed", "cancelled", "completed"]), notes: z.string().optional() }))
      .mutation(async ({ input }) => {
        const updated = await updateBooking(input.id, { status: input.status, notes: input.notes });
        if (!updated) throw new TRPCError({ code: "NOT_FOUND" });
        return updated;
      }),
    delete: protectedProcedure
      .use(async ({ ctx, next }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return next();
      })
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const success = await deleteBooking(input.id);
        if (!success) throw new TRPCError({ code: "NOT_FOUND" });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
