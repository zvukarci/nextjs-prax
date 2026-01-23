"use client";

import { removeLikeSong } from "@/actions/likesong";

export function RemoveLikeButton(props: {
    songId: number;
}) {
    return (
        <button
            className="btn btn-xs"
            onClick={() => {
                removeLikeSong(props.songId);
            }}
        >
            Unlike
        </button>
    );
}
