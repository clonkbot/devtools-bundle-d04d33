import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const submit = mutation({
  args: {
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
    plan: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    await ctx.db.insert("contactRequests", {
      email: args.email,
      company: args.company,
      message: args.message,
      plan: args.plan,
      createdAt: Date.now(),
      userId: userId ?? undefined,
    });

    return { success: true };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("contactRequests")
      .order("desc")
      .take(50);
  },
});
