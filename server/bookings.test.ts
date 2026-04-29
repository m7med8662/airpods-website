import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

/**
 * Mock context for testing
 */
function createMockContext(user: User | null): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

/**
 * Mock user data
 */
const mockUser: User = {
  id: 1,
  openId: "test-user-1",
  name: "Test User",
  email: "test@example.com",
  loginMethod: "manus",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const mockAdmin: User = {
  ...mockUser,
  id: 2,
  openId: "test-admin",
  role: "admin",
};

describe("Booking Procedures", () => {
  describe("bookings.create", () => {
    it("should create a booking for authenticated user", async () => {
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bookings.create({
        productName: "AirPods Pro 3",
        bookingDate: new Date("2026-05-15T10:00:00"),
        location: "Downtown Apple Store",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "+1234567890",
      });

      expect(result).toBeDefined();
      expect(result.productName).toBe("AirPods Pro 3");
      expect(result.status).toBe("pending");
      expect(result.userId).toBe(mockUser.id);
    });

    it("should reject unauthenticated requests", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.create({
          productName: "AirPods Pro 3",
          bookingDate: new Date("2026-05-15T10:00:00"),
          location: "Downtown Apple Store",
          customerName: "John Doe",
          customerEmail: "john@example.com",
          customerPhone: "+1234567890",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Please login");
      }
    });

    it("should validate email format", async () => {
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.create({
          productName: "AirPods Pro 3",
          bookingDate: new Date("2026-05-15T10:00:00"),
          location: "Downtown Apple Store",
          customerName: "John Doe",
          customerEmail: "invalid-email",
          customerPhone: "+1234567890",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("Invalid");
      }
    });

    it("should require all mandatory fields", async () => {
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.create({
          productName: "",
          bookingDate: new Date("2026-05-15T10:00:00"),
          location: "Downtown Apple Store",
          customerName: "John Doe",
          customerEmail: "john@example.com",
          customerPhone: "+1234567890",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("Too small");
      }
    });
  });

  describe("bookings.myBookings", () => {
    it("should return user's own bookings", async () => {
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      // Create a booking first
      await caller.bookings.create({
        productName: "AirPods Max",
        bookingDate: new Date("2026-05-20T14:00:00"),
        location: "Shopping Mall",
        customerName: "Jane Doe",
        customerEmail: "jane@example.com",
        customerPhone: "+9876543210",
      });

      // Fetch user's bookings
      const bookings = await caller.bookings.myBookings();

      expect(Array.isArray(bookings)).toBe(true);
      expect(bookings.length).toBeGreaterThan(0);
      expect(bookings.every((b) => b.userId === mockUser.id)).toBe(true);
    });

    it("should reject unauthenticated access", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.myBookings();
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Please login");
      }
    });
  });

  describe("bookings.all", () => {
    it("should allow admin to view all bookings", async () => {
      const ctx = createMockContext(mockAdmin);
      const caller = appRouter.createCaller(ctx);

      const bookings = await caller.bookings.all();

      expect(Array.isArray(bookings)).toBe(true);
    });

    it("should reject non-admin access", async () => {
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.all();
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("FORBIDDEN");
      }
    });

    it("should reject unauthenticated access", async () => {
      const ctx = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.all();
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Please login");
      }
    });
  });

  describe("bookings.updateStatus", () => {
    it("should allow admin to update booking status", async () => {
      const userCtx = createMockContext(mockUser);
      const userCaller = appRouter.createCaller(userCtx);

      // Create a booking
      const booking = await userCaller.bookings.create({
        productName: "AirPods 4",
        bookingDate: new Date("2026-05-25T09:00:00"),
        location: "Online Pickup",
        customerName: "Bob Smith",
        customerEmail: "bob@example.com",
        customerPhone: "+1111111111",
      });

      // Admin updates status
      const adminCtx = createMockContext(mockAdmin);
      const adminCaller = appRouter.createCaller(adminCtx);

      const updated = await adminCaller.bookings.updateStatus({
        id: booking.id,
        status: "confirmed",
        notes: "Confirmed for pickup",
      });

      expect(updated.status).toBe("confirmed");
      expect(updated.notes).toBe("Confirmed for pickup");
    });

    it("should reject non-admin status updates", async () => {
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.updateStatus({
          id: 999,
          status: "confirmed",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("FORBIDDEN");
      }
    });
  });

  describe("bookings.delete", () => {
    it("should allow admin to delete bookings", async () => {
      const userCtx = createMockContext(mockUser);
      const userCaller = appRouter.createCaller(userCtx);

      // Create a booking
      const booking = await userCaller.bookings.create({
        productName: "AirPods Pro 3",
        bookingDate: new Date("2026-06-01T15:00:00"),
        location: "Airport Terminal",
        customerName: "Alice Johnson",
        customerEmail: "alice@example.com",
        customerPhone: "+2222222222",
      });

      // Admin deletes it
      const adminCtx = createMockContext(mockAdmin);
      const adminCaller = appRouter.createCaller(adminCtx);

      const result = await adminCaller.bookings.delete({ id: booking.id });

      expect(result.success).toBe(true);
    });

    it("should reject non-admin deletion", async () => {
      const ctx = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.delete({ id: 999 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("FORBIDDEN");
      }
    });
  });
});
