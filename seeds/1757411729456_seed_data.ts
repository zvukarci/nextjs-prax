import { DB } from "@/lib/db-types";
import { faker } from "@faker-js/faker";
import type { Kysely } from "kysely";

export async function seed(db: Kysely<DB>): Promise<void> {
    await db.deleteFrom("songs").execute();
    await db.deleteFrom("albums").execute();
    await db.deleteFrom("authors").execute();
    await db.deleteFrom("playlists_songs").execute();
    await db.deleteFrom("playlists").execute();

    for (let i = 0; i < 20; i += 1) {
        const numBioParagraphs = faker.number.int({ min: 0, max: 5 });

        const bio =
            numBioParagraphs !== 0
                ? faker.lorem.paragraph(numBioParagraphs)
                : null;

        await db
            .insertInto("authors")
            .values({
                name: faker.music.artist(),
                bio,
            })
            .execute();
    }

    const authors = await db.selectFrom("authors").selectAll().execute();

    for (const author of authors) {
        const numAlbums = faker.number.int({ min: 0, max: 10 });

        for (let i = 0; i < numAlbums; i++) {
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

    const albums = await db.selectFrom("albums").selectAll().execute();

    for (const album of albums) {
        const typeOfAlbum = faker.number.int({ min: 0, max: 9 });

        let numSongs = 1;

        if (typeOfAlbum < 2) {
            numSongs = 1;
        } else if (typeOfAlbum < 5) {
            numSongs = faker.number.int({ min: 4, max: 6 });
        } else {
            numSongs = faker.number.int({ min: 10, max: 20 });
        }

        for (let i = 0; i < numSongs; i++) {
            await db
                .insertInto("songs")
                .values({
                    album_id: album.id,
                    name: faker.music.songName(),
                    duration: faker.number.int({ min: 90, max: 240 }),
                })
                .execute();
        }
    }

    const songs = await db.selectFrom("songs").selectAll().execute();

    await db
        .insertInto("users")
        .values({
            id: 1,
            email: faker.internet.email(),
            password: faker.internet.password(),
            name: faker.person.firstName(),
        })
        .execute();

    for (let i = 0; i < 10; i++) {
        await db
            .insertInto("users")
            .values({
                email: faker.internet.email(),
                password: faker.internet.password(),
                name: faker.person.firstName(),
            })
            .execute();
    }

    const users = await db.selectFrom("users").selectAll().execute();

    for (const user of users) {
        const numPlaylists = faker.number.int({ min: 1, max: 10 });

        for (let i = 0; i < numPlaylists; i++) {
            const playlistName = faker.music.genre() + " Playlist";
            const playlistResult = await db
                .insertInto("playlists")
                .values({ name: playlistName, user_id: user.id })
                .returning("id")
                .executeTakeFirst();

            const playlistId = playlistResult!.id;

            const shuffledSongs = faker.helpers.shuffle(songs);
            const numSongsInPlaylist = faker.number.int({ min: 5, max: 15 });
            const songsForPlaylist = shuffledSongs.slice(0, numSongsInPlaylist);

            for (const song of songsForPlaylist) {
                await db
                    .insertInto("playlists_songs")
                    .values({
                        playlist_id: playlistId,
                        song_id: song.id,
                    })
                    .execute();
            }
        }
    }
}
