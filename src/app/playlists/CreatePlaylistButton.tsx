"use client";

import { createPlaylist } from "@/actions/playlists";

export function CreatePlaylistButton() {
    return (
        <>
            <button
                className="btn btn-xs"
                onClick={() =>
                    (
                        document.getElementById(
                            "my_modal_2"
                        ) as HTMLDialogElement | null
                    )?.showModal()
                }
            >
                Create Playlist
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create Playlist</h3>
                    <form action={createPlaylist}>
                        <input
                            type="text"
                            className="input"
                            name="playlistName"
                        />
                        <input
                            type="submit"
                            className="btn btn-xs"
                            value="Create"
                        />
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-xs">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
