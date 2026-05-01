// lib/auth.ts
// Authentication helpers - bridge between Clerk and our DB

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

// Get the current user's DB record, create if not exists
export async function getOrCreateUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;   // ← Yeh important fix
  }

  // Check DB
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId));

  if (existingUser) {
    return existingUser;
  }

  // Get Clerk user data
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;   // ← Yeh bhi important fix
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || null;

  const [newUser] = await db.insert(users).values({
    clerkId: userId,
    email,
    name,
    avatarUrl: clerkUser.imageUrl,
    creditsBalance: 100,   // 100 free credits on signup
  }).returning();

  return newUser;
}

// Require auth in Server Components - redirects to sign-in
export async function requireUser() {
  const user = await getOrCreateUser();
  if (!user) {
    redirect("/sign-in");
  }
  return user;
}

// Get user for API routes - returns null instead of redirecting
export async function getUserForApi() {
  try {
    return await getOrCreateUser();
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
