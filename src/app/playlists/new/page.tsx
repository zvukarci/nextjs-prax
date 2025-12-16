import { createPlaylist } from "@/actions/playlists";

export default async function CreatePlaylistPage() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <p className="text-2xl font-bold">Create Playlist</p>
                <form action={createPlaylist} className="flex flex-col gap-4">
                    <input
                        className="border border-gray-300 rounded-md p-2"
                        type="text"
                        name="playlistName"
                        placeholder="Playlist Name"
                        required
                    />
                    <input
                        className="border border-gray-300 rounded-md p-2"
                        type="submit"
                        value="Create"
                    />
                </form>
            </main>
        </div>
    );
}
