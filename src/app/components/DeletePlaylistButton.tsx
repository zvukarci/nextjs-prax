"use client";

import { deletePlaylist } from "@/actions/playlists";

export function DeletePlaylistButton(props: { playlistId: number }) {
    return (
        <button
            className="btn btn-xs"
            onClick={() => {
                deletePlaylist(props.playlistId);
            }}
        >
            Delete
        </button>
    );
}
