import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const url = await ctx.storage.generateUploadUrl();
    return url;
  },
});

export const saveUploadedFile = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
    type: v.string(),
    size: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject ?? undefined;
    const rawUrl = await ctx.storage.getUrl(args.storageId);
    if (!rawUrl) {
      throw new Error("Gagal mendapatkan URL file dari storage");
    }
    const url = rawUrl;
    const now = Date.now();

    const fileId = await ctx.db.insert("files", {
      storageId: args.storageId,
      url,
      name: args.name,
      type: args.type,
      size: args.size,
      ownerId,
      createdAt: now,
      updatedAt: now,
    });

    return { id: fileId, url };
  },
});