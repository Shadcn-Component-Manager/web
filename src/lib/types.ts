import { z } from "zod";

// Base schema for files from registry.json
const registryFileSchema = z.object({
  path: z.string(),
  type: z.string(),
  target: z.string().optional(),
});

// Schema for files returned by our API, with content
const apiFileSchema = registryFileSchema.extend({
  content: z.string().optional(), // Content might not always be present
});

// Base schema from the registry library
export const registryItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  files: z.array(registryFileSchema),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  author: z.string().optional(),
  categories: z.array(z.string()).optional(),
  cssVars: z.any().optional(),
  docs: z.string().optional(),
  publishedAt: z.string().optional(),
  publisher: z.string().optional(),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;

// Extended schema for API responses
export const apiComponentSchema = registryItemSchema.extend({
  version: z.string(),
  author: z.string(),
  allVersions: z.array(z.string()).optional(),
  files: z.array(apiFileSchema),
});

export type ApiComponent = z.infer<typeof apiComponentSchema>;
