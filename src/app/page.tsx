import Image from "next/image";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import { DB } from "@/lib/db-types";

export default async function Home() {
    const dialect = new SqliteDialect({ database: new SQLite("db.sqlite") });
    const db = new Kysely<DB>({ dialect });

    const albums = await db
        .selectFrom("albums")
        .innerJoin("authors", "authors.id", "author_id")
        .select([
            "albums.id",
            "albums.name",
            "albums.release_date",
            "authors.name as author_id",
        ])
        .execute();

    console.log(albums[0]);

    return (
        <main className="bg-black min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center mb-12">
                    <Image
                        src="/spotify.png"
                        width={40}
                        height={40}
                        alt="Logo"
                        className="hover:scale-110 transition-transform"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {albums.map((album) => (
                        <div
                            key={album.id}
                            className="bg-white/10 p-6 rounded-lg hover:bg-white/15 transition-colors"
                        >
                            <h2 className="text-xl font-bold mb-2 text-white">
                                {album.author_id}
                            </h2>
                            <h3 className="text-lg text-white/80 mb-4">
                                {album.name}
                            </h3>
                            <span className="text-sm text-white/50 font-semibold">
                                {new Date(album.release_date).toDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
