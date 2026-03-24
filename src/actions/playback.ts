"use server";

import { getDb } from "@/lib/db";
import { getUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function recordPlaybackStart(songId: number) {
    const userId = await getUser();

    const db = getDb();
    await db
        .insertInto("playback_events")
        .values({
            user_id: userId,
            event_name: "playback_start",
            song_id: songId,
            timestamp: Date.now(),
        })
        .execute();
    revalidatePath("/history");
}

export async function recordPlaybackEnd(songId: number) {
    const userId = await getUser();

    const db = getDb();
    await db
        .insertInto("playback_events")
        .values({
            user_id: userId,
            event_name: "playback_end",
            song_id: songId,
            timestamp: Date.now(),
        })
        .execute();
    revalidatePath("/history");
}

export async function recordPlaybackSkip(songId: number) {
    const userId = await getUser();

    const db = getDb();
    await db
        .insertInto("playback_events")
        .values({
            user_id: userId,
            event_name: "playback_skip",
            song_id: songId,
            timestamp: Date.now(),
        })
        .execute();
    revalidatePath("/history");
}
