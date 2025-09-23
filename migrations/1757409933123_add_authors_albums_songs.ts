import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE authors (
		id integer primary key autoincrement not null,
		name text not null,
		bio text
	) STRICT`.execute(db);

  await sql`CREATE TABLE albums (
		id integer primary key autoincrement not null,
		author_id integer not null,
		name text not null,
		release_date integer not null,
		foreign key (author_id) references authors (id)
	) STRICT`.execute(db);

  await sql`CREATE TABLE songs (
		id integer primary key autoincrement not null,
		album_id integer not null,
		name text not null,
		duration integer not null,
		foreign key (album_id) references albums (id)
	) STRICT`.execute(db);
}
