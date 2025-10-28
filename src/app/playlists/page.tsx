import Link from "next/link";
import { getDb } from "@/lib/db";

export default async function Playlists() {
    const db = getDb();

    const playlists = await db
        .selectFrom("playlists")
        .select(["playlists.id", "playlists.name"])
        .execute();

    return (
        <main className="bg-[#121212] min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="bg-white/10 p-6 rounded-lg hover:bg-white/15 transition-colors"
                        >
                            <h3 className="text-lg text-white/80 mb-4">
                                {playlist.name}
                            </h3>
                            <div className="mt-6">
                                <Link
                                    className="btn btn-primary btn-block"
                                    href={`/playlist/${playlist.id}`}
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
