import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  // Waitlist signups
  waitlist: defineTable({
    email: v.string(),
    plan: v.string(), // "pro" | "enterprise"
    createdAt: v.number(),
    userId: v.optional(v.id("users")),
  }).index("by_email", ["email"]),

  // Contact form submissions
  contactRequests: defineTable({
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
    plan: v.string(),
    createdAt: v.number(),
    userId: v.optional(v.id("users")),
  }).index("by_email", ["email"]),

  // Analytics - track page views and interactions
  analytics: defineTable({
    event: v.string(), // "page_view" | "cta_click" | "faq_open"
    data: v.optional(v.string()),
    createdAt: v.number(),
    userId: v.optional(v.id("users")),
  }).index("by_event", ["event"]),

  // Subscriber count (real-time)
  stats: defineTable({
    key: v.string(),
    value: v.number(),
  }).index("by_key", ["key"]),
});
