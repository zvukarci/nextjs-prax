"use client";

import { useContext } from "react";
import { PlaybackContext } from "../playback-context";

export function SideBar() {
    const { isPlaying, queue, currentSong } = useContext(PlaybackContext);

    return (
        <div>
            <div>
                <p>Side Bar</p>
                <p>isPlaying: {String(isPlaying)}</p>
            </div>

            <div>
                <p>Queue</p>
                {queue.length === 0 ? (
                    <p>Queue is empty</p>
                ) : (
                    <ul>
                        {queue.map((song) => (
                            <li key={song.id}>
                                <span>{song.name}</span>
                                <span>{song.author}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
