import { cookies } from "next/headers";

export async function getUser(): Promise<number> {
    const cookieStore = await cookies();
    const userIdRaw = cookieStore.get("sessionToken")?.value ?? "1";
    const userId = Number(userIdRaw);
    return userId;
}
