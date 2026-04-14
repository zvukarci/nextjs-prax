"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NavBar = () => {
    const [searchInput, setSearchInput] = useState("");

    const searchQuery = searchInput !== " " ? { q: searchInput } : {};

    return (
        <div className="navbar shadow-sm flex justify-center items-center gap-x-4 bg-black p-2">
            <div className="dropdown">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {" "}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7"
                        />{" "}
                    </svg>
                </div>
                <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                    <li>
                        <Link
                            href={{
                                pathname: "/liked_songs",
                            }}
                        >
                            Liked Songs
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={{
                                pathname: "/playlists",
                            }}
                        >
                            Playlists
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={{
                                pathname: "/following_authors",
                            }}
                        >
                            Following Artists
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={{
                                pathname: "/history",
                            }}
                        >
                            History
                        </Link>
                    </li>
                </ul>
            </div>
            <Link href="/">
                <Image src="/spotify.png" width={40} height={40} alt="Logo" />
            </Link>

            <input
                type="text"
                placeholder="What do you want to play?"
                className="rounded-full md:w-auto py-2.5 pl-4 pr-32 bg-[#2a2a2a] text-white"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
            />

            <Link
                href={{
                    pathname: "/search",
                    query: searchQuery,
                }}
            >
                Search
            </Link>
        </div>
    );
};

export default NavBar;
