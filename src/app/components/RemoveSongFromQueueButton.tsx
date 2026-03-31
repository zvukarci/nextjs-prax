"use client";

import { useContext } from "react";
import { PlaybackContext, Song } from "../playback-context";

export function RemoveSongFromQueueButton(props: { songId: number }) {
    const playbackContext = useContext(PlaybackContext);
    const removeFromQueue = () => {
        if (
            "updateQueue" in playbackContext &&
            typeof playbackContext.updateQueue === "function"
        ) {
            playbackContext.updateQueue((prevQueue: Song[]) =>
                prevQueue.filter((song) => song.id !== props.songId),
            );
        }
    };

    return (
        <button className="btn btn-xs" onClick={removeFromQueue}>
            Remove from queue
        </button>
    );
}
