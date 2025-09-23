import { DB } from "@/lib/db-types";
import type { Kysely } from "kysely";
import { faker } from "@faker-js/faker";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("albums").execute();
  await db.deleteFrom("authors").execute();

  for (let i = 0; i < 10; i += 1) {
    await db
      .insertInto("authors")
      .values({
        name: faker.music.artist(),
        bio: faker.lorem.paragraph(),
      })
      .execute();
  }

  const authors = await db.selectFrom("authors").selectAll().execute();

  for (const author of authors) {
    await db
      .insertInto("albums")
      .values({
        author_id: author.id,
        name: faker.music.album(),
        release_date: faker.date.past().getTime(),
      })
      .execute();
  }
}
