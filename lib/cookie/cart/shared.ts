export const CART_COOKIE_NAME = "swag_store_cart";

export type CartCookieState = {
  token: string;
  totalItems: number;
};

export const EMPTY_CART_COOKIE_STATE: CartCookieState = {
  token: "",
  totalItems: 0,
};

export const CART_COOKIE_SET_OPTIONS = {
  path: "/",
  httpOnly: false,
  sameSite: "Lax",
  maxAge: 30,
  secure: process.env.NODE_ENV === "production",
};

export function serializeCartCookieState(state: CartCookieState): string {
  return JSON.stringify({
    token: typeof state.token === "string" ? state.token : "",
    totalItems: state.totalItems
  });
}

export function deserializeCartCookieState(raw: string | undefined | null): CartCookieState {
  if (raw == null || raw === "") {
    return { ...EMPTY_CART_COOKIE_STATE };
  }
  try {
    const cookie = JSON.parse(raw);
    const token = String(cookie["token"]);
    const totalItems = Number(cookie["totalItems"]);
    return { token, totalItems };
  } catch {
    return { ...EMPTY_CART_COOKIE_STATE };
  }
}



