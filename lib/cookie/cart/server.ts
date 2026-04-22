import 'server-only';
import { CART_COOKIE_NAME, deserializeCartCookieState } from "./shared";
import { cookies } from 'next/headers';


export async function getToken(): Promise<string | null> {
    const cookie = await cookies().then((cookieStore) => cookieStore.get(CART_COOKIE_NAME)?.value ?? null);
    if (!cookie) {
        return null
    }

    return deserializeCartCookieState(cookie).token;
}

