
import { NextResponse } from "next/server";
import { updateItemQuantity } from "@/lib/data/cartDataProvider";
import { getToken } from "@/lib/cookie/cart/server";

export async function POST(request: Request) {
  const token = await getToken();

  if (!token) {
    return NextResponse.json({ error: "No cart" }, { status: 400 });
  }

  const body = await request.json();
  const productId = body?.productId;
  const quantity = Number(body?.quantity);

  // TODO : stock check?  
  const cart = await updateItemQuantity(token, productId, quantity);
  if (!cart) {
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 505002 }
    );
  }

  return NextResponse.json(cart);
}
