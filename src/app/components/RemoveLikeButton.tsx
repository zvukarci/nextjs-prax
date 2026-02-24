"use client";

import { removeLikeSong } from "@/actions/likesong";

export function RemoveLikeButton(props: { userId: number; songId: number }) {
    return (
        <button
            className="btn btn-xs"
            onClick={() => {
                removeLikeSong(props.userId, props.songId);
            }}
        >
            Unlike
        </button>
    );
}
