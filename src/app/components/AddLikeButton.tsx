"use client";

import { addLikeSong } from "@/actions/likesong";

export function AddLikeButton(props: { userId: number; songId: number }) {
    return (
        <button
            className="btn btn-xs"
            onClick={() => {
                addLikeSong(props.userId, props.songId);
            }}
        >
            Like
        </button>
    );
}
