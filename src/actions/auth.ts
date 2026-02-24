"use server";

import { getDb } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const db = getDb();

export async function login(formData: FormData) {
    const cookieStore = await cookies();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        console.log("invalid");
        return;
    }

    const user = await db
        .selectFrom("users")
        .where("email", "=", email)
        .where("password", "=", password)
        .selectAll()
        .executeTakeFirst();

    if (!user) {
        console.log("invalid");
    } else {
        cookieStore.set("sessionToken", user.id.toString());
        redirect("/liked_songs");
    }
}
