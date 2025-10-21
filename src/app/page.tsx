import Link from "next/link";
import { getDb } from "@/lib/db";

export default async function Home() {
    const db = getDb();

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

    return (
        <main className="bg-[#121212] min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
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
                            <div className="mt-6">
                                <Link
                                    className="btn btn-primary btn-block"
                                    href={`/album/${album.id}`}
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
