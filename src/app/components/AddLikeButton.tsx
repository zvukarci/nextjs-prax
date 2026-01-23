"use client";

import { addLikeSong } from "@/actions/likesong";

export function AddLikeButton(props: {
    songId: number;
}) {
    return (
        <button
            className="btn btn-xs"
            onClick={() => {
                addLikeSong(props.songId);
            }}
        >
            Like
        </button>
    );
}
