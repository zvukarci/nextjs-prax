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

export async function addSong(playlistId: number, songId: number) {
    await db
        .insertInto("playlists_songs")
        .values({ playlist_id: playlistId, song_id: songId })
        .execute();

    revalidatePath(`/playlist/${playlistId}`);
}

export async function createPlaylist(formData: FormData) {
    const playlistName = formData.get("playlistName")?.toString();

    if (playlistName == null) {
        throw new Error("Playlist name missing");
    }
    if (playlistName === "") {
        throw new Error("Playlist name cannot be empty");
    }
    if (!playlistName) {
        throw new Error("Playlist name is required");
    }
    const newPlaylist = await db
        .insertInto("playlists")
        .values({
            name: playlistName,
            user_id: 1,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

    redirect(`/playlist/${newPlaylist.id}`);
}

export async function updatePlaylist(formData: FormData) {
    const playlistId = Number(formData.get("playlistId")?.toString());
    const playlistName = formData.get("playlistName")?.toString();

    if (playlistName == null) {
        throw new Error("Playlist name missing");
    }
    if (playlistName === "") {
        throw new Error("Playlist name cannot be empty");
    }
    if (!playlistName) {
        throw new Error("Playlist name is required");
    }
    await db
        .updateTable("playlists")
        .set({ name: playlistName })
        .where("id", "=", playlistId)
        .execute();
    redirect(`/playlist/${playlistId}`);
}
