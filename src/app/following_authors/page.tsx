import { getDb } from "@/lib/db";
import { getUser } from "@/lib/user";
import { UnfollowAuthorButton } from "../components/UnfollowAuthorButton";
import Link from "next/link";

export default async function LikedSongsPage() {
    const db = getDb();
    const userId = await getUser();

    const followingAuthors = await db
        .selectFrom("following_authors")
        .innerJoin("authors", "authors.id", "author_id")
        .select(["author_id", "authors.name", "following_at"])
        .where("user_id", "=", userId)
        .execute();

    return (
        <main className="container mx-auto px-4 py-12">
            <section>
                <h1>Following Authors</h1>
            </section>
            <section className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Author</th>
                            <th>Following at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {followingAuthors?.map((author, index) => (
                            <tr key={author.author_id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link href={`/author/${author.author_id}`}>
                                        {author.name}
                                    </Link>
                                </td>
                                <td>
                                    {new Date(
                                        author.following_at,
                                    ).toLocaleString()}
                                </td>
                                <td>
                                    <UnfollowAuthorButton
                                        userId={userId}
                                        authorId={author.author_id}
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
