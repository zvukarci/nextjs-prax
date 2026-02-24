"use client";

import { useEffect, useState } from "react";
import { AddLikeButton } from "./AddLikeButton";
import { AddSongToPlaylist } from "./AddSongToPlaylist";
import { addPlaybackEvent } from "@/actions/playback";

interface Song {
    id: number;
    name: string;
    author: string;
    duration: number;
}

interface Playlist {
    id: number;
    name: string;
}

function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function PlaybackBar(props: {
    userId: number;
    songs: Song[];
    playlists: Playlist[];
}) {
    const [queue, setQueue] = useState<Song[]>(props.songs);
    const [currentSong, setCurrentSong] = useState<Song | null>(queue[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(87);
    const [shuffle, setShuffle] = useState(false);
    const [playbackStart, setPlaybackStart] = useState<{
        timestamp: number;
        progressAtStart: number;
    } | null>(null);

    function startPlayback() {
        setPlaybackStart({
            timestamp: Date.now(),
            progressAtStart: progress,
        });
        setIsPlaying(true);
    }

    function pausePlayback() {
        setIsPlaying(false);
        setPlaybackStart(null);
    }

    function seekTo(newProgress: number) {
        setProgress(newProgress);
        if (isPlaying) {
            setPlaybackStart({
                timestamp: Date.now(),
                progressAtStart: newProgress,
            });
        }
    }

    function togglePlayback() {
        if (isPlaying) {
            pausePlayback();
        } else {
            startPlayback();
        }
    }

    function playNextSong(isSkip: boolean) {
        const currentSongId = currentSong?.id || 0;
        let nextSong: Song;

        if (shuffle) {
            const randomIndex = Math.floor(Math.random() * queue.length);
            nextSong = queue[randomIndex];
        } else {
            const currentIndex = queue.findIndex(
                (song) => song.id === currentSong?.id,
            );
            const nextIndex = (currentIndex + 1) % queue.length;
            nextSong = queue[nextIndex];
        }

        if (isSkip) {
            addPlaybackEvent(currentSongId, "playback_skip");
        } else {
            addPlaybackEvent(currentSongId, "playback_end");
        }

        addPlaybackEvent(nextSong.id, "playback_start");

        setCurrentSong(nextSong);
        setProgress(0);
        setPlaybackStart({
            timestamp: Date.now(),
            progressAtStart: 0,
        });
        setIsPlaying(true);
    }

    useEffect(() => {
        if (!isPlaying || currentSong == null || playbackStart == null) return;

        const interval = setInterval(() => {
            const elapsed = (Date.now() - playbackStart.timestamp) / 1000;
            const newProgress = playbackStart.progressAtStart + elapsed;

            if (newProgress >= currentSong.duration) {
                playNextSong(false);
            } else {
                setProgress(newProgress);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying, currentSong, playbackStart]);

    const id = currentSong?.id || 0;
    const duration = currentSong?.duration || 0;
    const remaining = duration - progress;

    return (
        <div className="flex items-center justify-between h-full pl-16 pr-4">
            <div className="flex items-center gap-3 w-48 min-w-48">
                {currentSong ? (
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">
                            {currentSong.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate">
                            {currentSong.author}
                        </span>
                    </div>
                ) : (
                    <div className="text-sm text-gray-500">No song playing</div>
                )}
                <div className="dropdown-top">
                    <AddSongToPlaylist
                        playlists={props.playlists}
                        songId={id}
                    />
                </div>
                <AddLikeButton userId={props.userId} songId={id} />
            </div>

            <div className="flex flex-col items-center gap-1 flex-1 max-w-xl">
                <div className="flex items-center gap-2">
                    <button
                        className={`btn btn-circle btn-sm btn-ghost hover:bg-green-600 ${
                            shuffle ? "bg-green-600" : ""
                        }`}
                        onClick={() => setShuffle(!shuffle)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-shuffle"
                            viewBox="0 0 16 16"
                        >
                            {" "}
                            <path
                                fillRule="evenodd"
                                d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
                            />{" "}
                            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
                        </svg>
                    </button>
                    <button
                        className="btn btn-circle btn-sm btn-ghost"
                        onClick={() => seekTo(0)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                        </svg>
                    </button>

                    <button
                        className="btn btn-circle btn-primary"
                        onClick={togglePlayback}
                    >
                        {isPlaying ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </button>

                    <button
                        className="btn btn-circle btn-sm btn-ghost"
                        onClick={() => playNextSong(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full">
                    <span className="text-xs text-gray-500 w-10 text-right">
                        {formatDuration(progress)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={progress}
                        onChange={(e) => seekTo(Number(e.target.value))}
                        className="range range-xs flex-1 cursor-pointer"
                    />
                    <span className="text-xs text-gray-500 w-10">
                        -{formatDuration(remaining)}
                    </span>
                </div>
            </div>
            <div className="w-48 min-w-48"></div>
        </div>
    );
}
