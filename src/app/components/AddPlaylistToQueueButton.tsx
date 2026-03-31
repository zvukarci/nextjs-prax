"use client";

import { useContext } from "react";
import { PlaybackContext, Song } from "../playback-context";

export function AddPlaylistToQueueButton(props: { songs: Song[] }) {
    const { addPlaylistToQueue } = useContext(PlaybackContext);

    return (
        <button
            className="btn btn-xs"
            onClick={() => addPlaylistToQueue(props.songs)}
        >
            Add to queue
        </button>
    );
}
