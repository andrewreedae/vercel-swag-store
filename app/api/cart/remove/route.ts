import { NextResponse } from "next/server";
import { removeItemFromCart } from "@/lib/data/cartDataProvider";
import { getToken } from "@/lib/cookie/cart/server";

export async function POST(request: Request) {
  const token = await getToken();

  if (!token) {
    return NextResponse.json({ error: "No cart" }, { status: 400 });
  }

  const body = await request.json();
  const productId = body?.productId;

  const cart = await removeItemFromCart(token, productId);
  if (!cart) {
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }

  return NextResponse.json(cart);
}
