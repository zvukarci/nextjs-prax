"use client";

import { updatePlaylist } from "@/actions/playlists";

export function UpdatePlaylistButton(props: {
    playlistId: number;
    playlistName: string;
}) {
    return (
        <>
            <button
                className="btn btn-xs"
                onClick={() =>
                    (
                        document.getElementById(
                            "my_modal_2",
                        ) as HTMLDialogElement | null
                    )?.showModal()
                }
            >
                Update Playlist
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Playlist</h3>
                    <form action={updatePlaylist}>
                        <input
                            className="input"
                            type="text"
                            name="playlistName"
                            defaultValue={props.playlistName}
                        />
                        <input
                            className="btn btn-xs"
                            type="submit"
                            value="Update"
                        />
                        <input
                            type="text"
                            name="playlistId"
                            value={props.playlistId}
                            hidden
                            readOnly
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
