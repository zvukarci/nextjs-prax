import { login } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <main className="min-h-screen bg-[#121212] flex flex-col items-center">
            <header className="pt-8 pb-6">
                <Link href="/">
                    <Image
                        src="/spotify.png"
                        width={40}
                        height={40}
                        alt="Logo"
                    />
                </Link>
            </header>
            <section className="w-full max-w-md px-8">
                <h1 className="text-white text-5xl font-bold text-center mb-8">
                    Welcome Back
                </h1>
                <div className="flex flex-col"></div>
                <form action={login} className="flex flex-col gap-4">
                    <section className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-white text-sm font-bold"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            type="text"
                            className="w-full border-2 border-[#727272] rounded-[4px] py-3 px-4 text-white focus:outline-none focus:border-white transition-colors"
                        />
                    </section>
                    <section className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="text-white text-sm font-bold"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="w-full border-2 border-[#727272] rounded-[4px] py-3 px-4 text-white focus:outline-none focus:border-white transition-colors"
                        />
                    </section>

                    <button type="submit" className="btn">
                        Log In
                    </button>
                </form>
            </section>
        </main>
    );
}
