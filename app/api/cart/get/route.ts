import { NextResponse } from "next/server";
import { createCart, getCart } from "@/lib/data/cartDataProvider";
import { getToken } from "@/lib/cookie/cart/server";

export async function GET(request: Request) {
  let cart = null;

  let token = await getToken();
  if (token) {
    cart = await getCart(token);
  }

  if (!cart) {
    cart = await createCart();
  }

  if (!cart) {
    return NextResponse.json({ error: "No cart" }, { status: 400 });
  }

  return NextResponse.json(cart);
}
