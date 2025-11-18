"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const db = getDb();

export async function removeSongFromPlaylist(
    playlistId: number,
    songId: number
) {
    await db
        .deleteFrom("playlists_songs")
        .where("playlist_id", "=", playlistId)
        .where("song_id", "=", songId)
        .execute();

    revalidatePath(`/playlist/${playlistId}`);
}

export async function deletePlaylist(playlistId: number) {
    await db
        .deleteFrom("playlists_songs")
        .where("playlist_id", "=", playlistId)
        .execute();
    await db.deleteFrom("playlists").where("id", "=", playlistId).execute();

    redirect("/playlists");
}
