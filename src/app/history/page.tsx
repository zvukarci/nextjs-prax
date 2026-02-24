import { getDb } from "@/lib/db";
import { getUser } from "@/lib/user";

export default async function History() {
    const db = getDb();
    const userId = Number(await getUser());

    const songs = await db
        .selectFrom("songs")
        .innerJoin("playback_events", "playback_events.song_id", "songs.id")
        .select([
            "playback_events.id as event_id",
            "songs.id",
            "songs.name",
            "playback_events.event_name",
            "playback_events.timestamp",
        ])
        .where("user_id", "=", userId)
        .where("playback_events.event_name", "=", "playback_end")
        .execute();

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>History</h1>
                <p>Statistics of your listening</p>
            </section>
            <section className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Event</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs?.map((song, index) => (
                            <tr key={song.event_id}>
                                <td>{index + 1}</td>
                                <td>{song.name}</td>
                                <td>{song.event_name}</td>
                                <td>
                                    {new Date(song.timestamp).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
