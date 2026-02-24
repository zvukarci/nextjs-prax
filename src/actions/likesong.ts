"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

const db = getDb();

export async function addLikeSong(userId: number, songId: number) {
    await db
        .insertInto("user_liked_songs")
        .values({ user_id: userId, song_id: songId })
        .execute();

    revalidatePath(`/liked_songs`);
}

export async function removeLikeSong(userId: number, songId: number) {
    await db
        .deleteFrom("user_liked_songs")
        .where("user_id", "=", userId)
        .where("song_id", "=", songId)
        .execute();

    revalidatePath(`/liked_songs`);
}
