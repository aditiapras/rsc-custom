import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveDocument = mutation({
  args: {
    id: v.optional(v.id("documents")),
    title: v.string(),
    content: v.any(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const identity = await ctx.auth.getUserIdentity();

    if (args.id) {
      await ctx.db.patch(args.id, {
        title: args.title,
        content: args.content,
        updatedAt: now,
      });
      return args.id;
    }

    const ownerId = identity?.subject ?? undefined;

    const id = await ctx.db.insert("documents", {
      title: args.title,
      content: args.content,
      ownerId,
      createdAt: now,
      updatedAt: now,
    });

    return id;
  },
});

export const getDocumentById = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.id);
    return doc ?? null;
  },
});
