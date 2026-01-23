import { getDb } from "@/lib/db";
import { RemoveLikeButton } from "@/app/components/RemoveLikeButton";

export default async function LikedSongs() {
    const db = getDb();
    const songs = await db
      .selectFrom("songs")
      .innerJoin("user_liked_songs", "user_liked_songs.song_id", "songs.id")
      .select(["songs.id", "user_liked_songs.id as liked_song_id", "songs.name", "songs.duration"])
      .where("user_id", "=", 1)
      .execute()

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>Liked Songs</h1>
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
                            <tr key={song.liked_song_id}>
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
                                  <RemoveLikeButton songId={song.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
