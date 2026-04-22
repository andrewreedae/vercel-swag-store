"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/types/api";
import { readCartCookieFromDocument, removeCartCookie, saveCartToCookie } from "@/lib/cookie/cart/client";
import { CartCookieState } from "@/lib/cookie/cart/shared";

type CartStateType = Cart & { loadingStatus?: "unloaded" | "provisional" }

type CartContextType = {
  cart: CartStateType;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  isPending: boolean;
};

const EMPTY_CART: CartStateType = {
  items: [],
  totalItems: 0,
  token: "",
  subtotal: 0,
  currency: "USD",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: {
  children: ReactNode;
}) {
  const [cartState, setCartState] = useState<CartStateType>({ ...EMPTY_CART, loadingStatus: "unloaded" });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getLocalPartialCart = async (cookie: CartCookieState) => {
      if (cookie) {
        setCartState({ ...EMPTY_CART, totalItems: cookie.totalItems, loadingStatus: "provisional" });
      }
      return cookie;
    }

    const getLiveCart = async (token: string) => {
      if (token) {
        const res = await fetch(`/api/cart/get?token=${token}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          setCartState({ ...EMPTY_CART });
          removeCartCookie();
        }
        const cart = await res.json() as Cart;
        setCartState(cart);
        return;
      }
      setCartState({ ...EMPTY_CART });
    }

    const cookie = readCartCookieFromDocument();
    if (cookie) {
      getLocalPartialCart(cookie).then((cookie) => {
        getLiveCart(cookie.token);
      });
    }
    else {
      setCartState({ ...EMPTY_CART });
    }
  }, []);

  const addItem = (
    productId: string,
    quantity = 1,
  ) => {
    startTransition(
      async () => {
        const res = await fetch("/api/cart/add", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        if (!res.ok) return;
        const cart = await res.json() as Cart;
        setCartState(cart);
        saveCartToCookie(cart);
      }
    );
  }

  const removeItem = (productId: string) => {
    startTransition(
      async () => {
        const res = await fetch("/api/cart/remove", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
        if (!res.ok) return;
        const cart = await res.json() as Cart;
        setCartState(cart);
        saveCartToCookie(cart);
      }
    );
  }

  const updateItemQuantity =
    async (productId: string, quantity: number) => {
      startTransition(
        async () => {
          const res = await fetch("/api/cart/edit", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity }),
          });
          if (!res.ok) return;
          const cart = await res.json() as Cart;
          setCartState(cart);
          saveCartToCookie(cart);
        }
      );
    }

  const value = {
    cart: cartState,
    addItem,
    removeItem,
    updateItemQuantity,
    isPending,
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (ctx == null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
