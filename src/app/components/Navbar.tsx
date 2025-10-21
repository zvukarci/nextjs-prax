"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
    const [searchInput, setSearchInput] = useState("");

    const searchQuery = searchInput !== " " ? { q: searchInput } : {};

    return (
        <div className="navbar shadow-sm flex justify-center items-center gap-x-4 bg-black p-2">
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

export default Navbar;
