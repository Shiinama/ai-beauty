'use server'

import { eq } from 'drizzle-orm'

import { createDb } from '@/lib/db'
import { userAnalysisUsage } from '@/lib/db/schema'

export async function createUserAnalysisUsage(userId: string) {
  const db = createDb()
  try {
    await db.insert(userAnalysisUsage).values({
      userId,
      usageCount: 0
    })
    return true
  } catch (error) {
    console.error('Error creating user analysis usage:', error)
    return false
  }
}

export async function incrementUserAnalysisUsage(userId: string) {
  const db = createDb()
  try {
    // First, check if the user has a usage record
    const userUsage = await db.select().from(userAnalysisUsage).where(eq(userAnalysisUsage.userId, userId)).limit(1)

    if (userUsage.length === 0) {
      // If no record exists, create one
      await createUserAnalysisUsage(userId)
      // Then increment it
      await db.update(userAnalysisUsage).set({ usageCount: 1 }).where(eq(userAnalysisUsage.userId, userId))
    } else {
      // If record exists, increment the count
      await db
        .update(userAnalysisUsage)
        .set({ usageCount: userUsage[0].usageCount + 1 })
        .where(eq(userAnalysisUsage.userId, userId))
    }
    return true
  } catch (error) {
    console.error('Error incrementing user analysis usage:', error)
    return false
  }
}

export async function getUserAnalysisUsage(userId: string) {
  const db = createDb()
  try {
    const userUsage = await db.select().from(userAnalysisUsage).where(eq(userAnalysisUsage.userId, userId)).limit(1)

    if (userUsage.length === 0) {
      // If no record exists, create one
      await createUserAnalysisUsage(userId)
      return 0
    }

    return userUsage[0].usageCount
  } catch (error) {
    console.error('Error getting user analysis usage:', error)
    return 0
  }
}

export async function hasRemainingFreeAnalysis(userId: string) {
  const usageCount = await getUserAnalysisUsage(userId)
  return usageCount < 10 // Return true if user has used less than 5 analyses
}
