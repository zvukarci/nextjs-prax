import { getDb } from "@/lib/db";
import Link from "next/link";

export default async function AuthorDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const db = getDb();

    const author = await db
        .selectFrom("authors")
        .select(["authors.name", "authors.bio"])
        .where("id", "=", Number(id))
        .executeTakeFirst();

    const albums = await db
        .selectFrom("albums")
        .select(["albums.id", "albums.name", "albums.release_date"])
        .where("author_id", "=", Number(id))
        .execute();

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>{author?.name}</h1>
                <p className="text-neutral-700">{author?.bio}</p>
            </section>
            <section className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Albums</th>
                            <th>Release Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albums?.map((album, index) => (
                            <tr key={album.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link href={`/album/${album.id}`}>
                                        {album.name}
                                    </Link>
                                </td>
                                <td>
                                    <time>
                                        {album.release_date
                                            ? new Date(
                                                  Number(album.release_date)
                                              ).toDateString()
                                            : ""}
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
