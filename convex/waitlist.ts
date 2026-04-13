import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const join = mutation({
  args: {
    email: v.string(),
    plan: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    // Check if email already exists
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { success: false, message: "Email already registered" };
    }

    await ctx.db.insert("waitlist", {
      email: args.email,
      plan: args.plan,
      createdAt: Date.now(),
      userId: userId ?? undefined,
    });

    // Update subscriber count
    const stats = await ctx.db
      .query("stats")
      .withIndex("by_key", (q) => q.eq("key", "subscriber_count"))
      .first();

    if (stats) {
      await ctx.db.patch(stats._id, { value: stats.value + 1 });
    } else {
      await ctx.db.insert("stats", { key: "subscriber_count", value: 2451 });
    }

    return { success: true, message: "Successfully joined waitlist!" };
  },
});

export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db
      .query("stats")
      .withIndex("by_key", (q) => q.eq("key", "subscriber_count"))
      .first();

    return stats?.value ?? 2450;
  },
});
