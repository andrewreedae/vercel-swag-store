import { NextResponse } from "next/server";
import { createCart, addToCart } from "@/lib/data/cartDataProvider";
import { getToken } from "@/lib/cookie/cart/server";

export async function POST(request: Request) {
  let token = await getToken();
  if (!token) {
    const newCart = await createCart();
    if (!newCart?.token) {
      return NextResponse.json(
        { error: "Failed to create cart" },
        { status: 500 }
      );
    }
    token = newCart.token;
  }

  const body = await request.json();
  const productId = body?.productId;
  const quantity = Number(body?.quantity);

  // TODO : stock check?  
  if (quantity) {
    const cart = await addToCart(token, productId, quantity);
    if (!cart) {
      return NextResponse.json(
        { error: "Failed to add to cart" },
        { status: 500 }
      );
    }

    return NextResponse.json(cart);
  }
  else {
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
