import { getDb } from "@/lib/db";
import { getUser } from "@/lib/user";
import { RemovePlaylistSongButton } from "@/app/components/RemovePlaylistSongButton";
import { DeletePlaylistButton } from "@/app/components/DeletePlaylistButton";
import { UpdatePlaylistButton } from "@/app/components/UpdatePlaylistButton";
import { AddLikeButton } from "@/app/components/AddLikeButton";

export default async function PlaylistDetailPage({
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
    const userId = await getUser();

    const playlist = await db
        .selectFrom("playlists")
        .select(["playlists.name"])
        .where("id", "=", playlistId)
        .executeTakeFirst();

    if (playlist == null) {
        return <div>Playlist not found</div>;
    }

    const songs = await db
        .selectFrom("playlists_songs")
        .innerJoin("songs", "songs.id", "song_id")
        .select([
            "playlists_songs.id as playlist_song_id",
            "song_id",
            "songs.name",
            "songs.duration",
        ])
        .where("playlists_songs.playlist_id", "=", playlistId)
        .execute();

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>{playlist?.name}</h1>
                <UpdatePlaylistButton
                    playlistId={playlistId}
                    playlistName={playlist.name}
                />
                <DeletePlaylistButton playlistId={playlistId} />
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
                                <td>
                                    <RemovePlaylistSongButton
                                        playlistId={playlistId}
                                        songId={song.song_id}
                                    />
                                    <AddLikeButton
                                        userId={userId}
                                        songId={song.song_id}
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
