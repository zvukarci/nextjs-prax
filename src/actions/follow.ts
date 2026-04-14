"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

const db = getDb();

export async function followAuthor(userId: number, authorId: number) {
    await db
        .insertInto("following_authors")
        .values({
            user_id: userId,
            author_id: authorId,
            following_at: Date.now(),
        })
        .execute();

    revalidatePath(`/following_authors`);
}

export async function unfollowAuthor(userId: number, authorId: number) {
    await db
        .deleteFrom("following_authors")
        .where("user_id", "=", userId)
        .where("author_id", "=", authorId)
        .execute();

    revalidatePath(`/following_authors`);
}
