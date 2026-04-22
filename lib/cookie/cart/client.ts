"use client";

import Cookies from "js-cookie";

import type { Cart } from "@/lib/types/api";
import {
    CART_COOKIE_NAME,
    CART_COOKIE_SET_OPTIONS,
    deserializeCartCookieState,
    serializeCartCookieState,
    CartCookieState,

} from "./shared";


export function readCartCookieFromDocument(): CartCookieState {
    const raw = Cookies.get(CART_COOKIE_NAME);
    return deserializeCartCookieState(raw);
}

export function saveCartToCookie(cart: Cart) {
    const cookieAttributes = {
        path: CART_COOKIE_SET_OPTIONS.path,
        expires: CART_COOKIE_SET_OPTIONS.maxAge,
        sameSite: CART_COOKIE_SET_OPTIONS.sameSite,
        secure: CART_COOKIE_SET_OPTIONS.secure,
    } as Cookies.CookieAttributes;

    Cookies.set(
        CART_COOKIE_NAME,
        serializeCartCookieState(cart),
        cookieAttributes
    );
}

export function removeCartCookie() {
    Cookies.remove(CART_COOKIE_NAME);
}
