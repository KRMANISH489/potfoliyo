import mongoose from "mongoose";
import type { Project } from "@/types/project";

const MONGODB_URI = process.env.MONGODB_URI;

/** Mongoose schema mirrors the Project interface for optional MongoDB storage */
const projectSchema = new mongoose.Schema<Project>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    techStack: [{ type: String }],
    liveUrl: { type: String, required: true },
    featured: { type: Boolean, default: false },
    clientNiche: { type: String, required: true },
    role: { type: String, required: true },
    features: [{ type: String }],
    challenges: { type: String, required: true },
    solutions: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { collection: "projects" }
);

export const ProjectModel =
  mongoose.models.Project || mongoose.model<Project>("Project", projectSchema);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalCache = global as typeof global & { mongooseCache?: MongooseCache };
const cached: MongooseCache = globalCache.mongooseCache ?? { conn: null, promise: null };
globalCache.mongooseCache = cached;

/** Connect to MongoDB when MONGODB_URI is configured */
export async function connectDB() {
  if (!MONGODB_URI) return null;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function useMongoDB() {
  return Boolean(MONGODB_URI);
}
