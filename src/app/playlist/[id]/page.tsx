import { getDb } from "@/lib/db";

export default async function PlaylistDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const db = getDb();

    const playlist = await db
        .selectFrom("playlists")
        .select(["playlists.name"])
        .where("id", "=", Number(id))
        .executeTakeFirst();

    const songs = await db
        .selectFrom("playlists_songs")
        .innerJoin("songs", "songs.id", "song_id")
        .select([
            "playlists_songs.id as playlist_song_id",
            "song_id",
            "songs.name",
            "songs.duration",
        ])
        .where("playlists_songs.playlist_id", "=", Number(id))
        .execute();

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>{playlist?.name}</h1>
            </section>
            <section className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs?.map((song, index) => (
                            <tr key={song.playlist_song_id}>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
