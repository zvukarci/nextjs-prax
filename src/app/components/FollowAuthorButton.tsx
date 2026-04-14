"use client";

import { followAuthor } from "@/actions/follow";

export function FollowAuthorButton(props: {
    userId: number;
    authorId: number;
}) {
    return (
        <button
            className="btn btn-xs"
            onClick={() => {
                followAuthor(props.userId, props.authorId);
            }}
        >
            Follow
        </button>
    );
}
