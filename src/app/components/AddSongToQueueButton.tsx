"use client";

import { useContext } from "react";
import { PlaybackContext, Song } from "../playback-context";

export function AddSongToQueueButton(props: {
    songId: number;
    songName: string;
    songAuthor: string;
    songDuration: number;
}) {
    const { addSongToQueue } = useContext(PlaybackContext);

    return (
        <button
            className="btn btn-xs"
            onClick={() =>
                addSongToQueue({
                    id: props.songId,
                    name: props.songName,
                    author: props.songAuthor,
                    duration: props.songDuration,
                } as Song)
            }
        >
            Add to queue
        </button>
    );
}
