import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import { DB } from "@/lib/db-types";

export default async function AlbumDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const dialect = new SqliteDialect({ database: new SQLite("db.sqlite") });
    const db = new Kysely<DB>({ dialect });

    const albums = await db
        .selectFrom("albums")
        .select(["albums.name", "albums.release_date"])
        .where("albums.id", "=", Number(id))
        .execute();
    const songs = await db
        .selectFrom("songs")
        .select(["songs.id", "songs.name", "songs.duration"])
        .where("album_id", "=", Number(id))
        .execute();

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>{albums[0]?.name}</h1>
                <time className="text-neutral-700 text-xs">
                    {albums[0]?.release_date
                        ? new Date(
                              Number(albums[0].release_date)
                          ).toDateString()
                        : ""}
                </time>
            </section>
            <section className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Duration</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
