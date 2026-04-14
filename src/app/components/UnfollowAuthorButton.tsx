"use client";

import { unfollowAuthor } from "@/actions/follow";

export function UnfollowAuthorButton(props: {
    userId: number;
    authorId: number;
}) {
    return (
        <button
            className="btn btn-xs"
            onClick={() => {
                unfollowAuthor(props.userId, props.authorId);
            }}
        >
            Unfollow
        </button>
    );
}
