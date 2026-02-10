import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Albums {
  id: Generated<number>;
  author_id: number;
  name: string;
  release_date: number;
}

export interface Authors {
  id: Generated<number>;
  name: string;
  bio: string | null;
}

export interface PlaybackEvents {
  id: Generated<number>;
  event_name: string;
  timestamp: number;
  user_id: number;
  song_id: number;
}

export interface Playlists {
  id: Generated<number>;
  name: string;
  user_id: number;
}

export interface PlaylistsSongs {
  id: Generated<number>;
  playlist_id: number;
  song_id: number;
}

export interface Songs {
  id: Generated<number>;
  album_id: number;
  name: string;
  duration: number;
}

export interface UserLikedSongs {
  id: Generated<number>;
  user_id: number;
  song_id: number;
}

export interface Users {
  id: Generated<number>;
  email: string;
  password: string;
  name: string | null;
}

export interface DB {
  albums: Albums;
  authors: Authors;
  playback_events: PlaybackEvents;
  playlists: Playlists;
  playlists_songs: PlaylistsSongs;
  songs: Songs;
  user_liked_songs: UserLikedSongs;
  users: Users;
}
