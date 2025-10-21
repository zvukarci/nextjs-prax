import { getDb } from "@/lib/db";

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const db = getDb();

    const { q = "" } = await searchParams;

    const authors = await db
        .selectFrom("authors")
        .select(["authors.id", "authors.name"])
        .where("name", "like", `%${q}%`)
        .execute();

    const albums = await db
        .selectFrom("albums")
        .select(["albums.id", "albums.name"])
        .where("name", "like", `%${q}%`)
        .execute();

    const songs = await db
        .selectFrom("songs")
        .select(["songs.id", "songs.name"])
        .where("name", "like", `%${q}%`)
        .execute();

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>authors</h1>
                {authors.map((author) => (
                    <div
                        key={author.id}
                        className="bg-white/10 p-6 rounded-lg hover:bg-white/15 transition-colors"
                    >
                        <h3 className="text-lg text-white/80 mb-4">
                            {author.name}
                        </h3>
                    </div>
                ))}
            </section>
            <section>
                <h1>albums</h1>
                {albums.map((album) => (
                    <div
                        key={album.id}
                        className="bg-white/10 p-6 rounded-lg hover:bg-white/15 transition-colors"
                    >
                        <h3 className="text-lg text-white/80 mb-4">
                            {album.name}
                        </h3>
                    </div>
                ))}
            </section>
            <section>
                <h1>songs</h1>
                {songs.map((song) => (
                    <div
                        key={song.id}
                        className="bg-white/10 p-6 rounded-lg hover:bg-white/15 transition-colors"
                    >
                        <h3 className="text-lg text-white/80 mb-4">
                            {song.name}
                        </h3>
                    </div>
                ))}
            </section>
        </main>
    );
}
