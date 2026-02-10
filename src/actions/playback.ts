"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

const db = getDb();

export async function addPlaybackEvent(songId: number, eventName: string) {
    await db
        .insertInto("playback_events")
        .values({
            user_id: 1,
            song_id: songId,
            event_name: eventName,
            timestamp: new Date().getTime(),
        })
        .execute();

    revalidatePath(`/history`);
}
