import { cookies } from "next/headers";

export async function getUser() {
    const cookieStore = await cookies();
    return cookieStore.get("sessionToken")?.value ?? "1";
}
