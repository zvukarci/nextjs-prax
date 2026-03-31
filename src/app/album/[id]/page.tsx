import { getDb } from "@/lib/db";
import { getUser } from "@/lib/user";
import Link from "next/link";
import { AddSongToPlaylist } from "@/app/components/AddSongToPlaylist";
import { AddLikeButton } from "@/app/components/AddLikeButton";
import { AddSongToQueueButton } from "@/app/components/AddSongToQueueButton";
import { AddPlaylistToQueueButton } from "@/app/components/AddPlaylistToQueueButton";
import { Song } from "@/app/playback-context";

export default async function AlbumDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const albumId = Number(id);

    const db = getDb();
    const userId = await getUser();

    const album = await db
        .selectFrom("albums")
        .innerJoin("authors", "authors.id", "albums.author_id")
        .select([
            "authors.id",
            "albums.name",
            "albums.release_date",
            "authors.name as author_name",
        ])
        .where("albums.id", "=", albumId)
        .executeTakeFirst();

    const songsFromDb = await db
        .selectFrom("songs")
        .select(["songs.id", "songs.name", "songs.duration"])
        .where("album_id", "=", albumId)
        .execute();

    const songs: Song[] = songsFromDb.map((song) => ({
        id: song.id,
        name: song.name,
        author: album?.author_name || "",
        duration: song.duration,
    }));

    const playlists = await db
        .selectFrom("playlists")
        .select(["playlists.id", "playlists.name"])
        .where("playlists.user_id", "=", userId)
        .execute();

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>{album?.name}</h1>
                <Link href={`/author/${album?.id}`}>{album?.author_name}</Link>
                <time className="text-neutral-700 text-xs">
                    {album?.release_date
                        ? new Date(Number(album.release_date)).toDateString()
                        : ""}
                </time>
                <AddPlaylistToQueueButton songs={songs} />
            </section>
            <section className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr key={song.id}>
                                <td>{index + 1}</td>
                                <td>{song.name}</td>
                                <td>
                                    <time>
                                        {Math.floor(song.duration / 60)}:
                                        {(song.duration % 60)
                                            .toString()
                                            .padStart(2, "0")}
                                    </time>
                                </td>
                                <td>
                                    <AddSongToPlaylist
                                        playlists={playlists}
                                        songId={song.id}
                                    />
                                    <AddLikeButton
                                        userId={userId}
                                        songId={song.id}
                                    />
                                    <AddSongToQueueButton
                                        songId={song.id}
                                        songName={song.name}
                                        songAuthor={song.author}
                                        songDuration={song.duration}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
