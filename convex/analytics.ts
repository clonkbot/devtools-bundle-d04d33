import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const track = mutation({
  args: {
    event: v.string(),
    data: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    await ctx.db.insert("analytics", {
      event: args.event,
      data: args.data,
      createdAt: Date.now(),
      userId: userId ?? undefined,
    });
  },
});

export const getEventCount = query({
  args: { event: v.string() },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("analytics")
      .withIndex("by_event", (q) => q.eq("event", args.event))
      .collect();

    return events.length;
  },
});
