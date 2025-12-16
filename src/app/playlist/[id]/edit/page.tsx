import { updatePlaylist } from "@/actions/playlists";
import { getDb } from "@/lib/db";

export default async function UpdatePlaylistPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const playlistId = Number(id);

    if (isNaN(playlistId)) {
        return <div>Invalid Playlist id</div>;
    }

    const db = getDb();

    const playlist = await db
        .selectFrom("playlists")
        .selectAll()
        .where("id", "=", playlistId)
        .executeTakeFirst();

    if (playlist == null) {
        return <div>Playlist not found</div>;
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <p className="text-2xl font-bold">
                    Edit Playlist: {playlist.name}
                </p>
                <form action={updatePlaylist} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="playlistId"
                        value={playlist.id}
                        hidden
                        readOnly
                    />
                    <input
                        className="input"
                        type="text"
                        name="playlistName"
                        defaultValue={playlist.name}
                    />
                    <input className="btn" type="submit" value="Update" />
                </form>
            </main>
        </div>
    );
}
