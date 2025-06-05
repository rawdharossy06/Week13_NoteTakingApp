import { z } from "zod";

export const noteSchema = z.object({
  //TODO: create the title and content schema, 
  // Make sure the title is required and the content is required
  // Make sure the title is max 50 characters and the content is max 500 characters
  title: z.string().max(50, "Title must be at most 50 characters").min(1, "Title is required"),
  content: z.string().max(500, "Content must be at most 500 characters").min(1, "Content is required"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  userId: z.string().uuid(),
  id: z.string().uuid().optional(), 
  tags: z.array(z.string()).optional(), 
  color: z.string().optional(), 
  isPinned: z.boolean().default(false), 
  isArchived: z.boolean().default(false), 
  isDeleted: z.boolean().default(false), 
  attachments: z.array(z.string()).optional(),
  category: z.string().optional(), 
  priority: z.enum(["low", "medium", "high"]).optional(), 
  });
export const notesSchema = z.array(noteSchema);