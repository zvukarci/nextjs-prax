import { getDb } from "@/lib/db";
import Link from "next/link";
import { AddSongToPlaylist } from "./AddSongToPlaylist";

export default async function AlbumDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const db = getDb();

    const album = await db
        .selectFrom("albums")
        .innerJoin("authors", "authors.id", "albums.author_id")
        .select([
            "authors.id",
            "albums.name",
            "albums.release_date",
            "authors.name as author_name",
        ])
        .where("albums.id", "=", Number(id))
        .executeTakeFirst();

    const songs = await db
        .selectFrom("songs")
        .select(["songs.id", "songs.name", "songs.duration"])
        .where("album_id", "=", Number(id))
        .execute();

    const playlists = await db
        .selectFrom("playlists")
        .select(["playlists.id", "playlists.name"])
        .where("playlists.user_id", "=", 1)
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
                        {songs?.map((song, index) => (
                            <tr key={song.id}>
                                <td>{index + 1}</td>
                                <td>{song.name}</td>
                                <td>
                                    <time>
                                        {Math.floor(song.duration / 60)}:
                                        {(
                                            song.duration -
                                            Math.floor(song.duration / 60) * 60
                                        )
                                            .toString()
                                            .padStart(2, "0")}
                                    </time>
                                </td>
                                <td>
                                    <AddSongToPlaylist
                                        playlists={playlists}
                                        songId={song.id}
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
