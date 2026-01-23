"use client";

import { addSong } from "@/actions/playlists";

export function AddSongToPlaylist(props: {
    playlists: object;
    songId: number;
}) {
    const playlists = Object.values(props.playlists);
    const songId = props.songId;

    return (
        <details className="dropdown">
            <summary className="btn m-1">Add to playlist</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {playlists.map((playlist: { id: number; name: string }) => (
                    <li key={playlist.id} value={playlist.id}>
                        <button
                            onClick={() => {
                                addSong(playlist.id, songId);
                            }}
                        >
                            {playlist.name}
                        </button>
                    </li>
                ))}
            </ul>
        </details>
    );
}
