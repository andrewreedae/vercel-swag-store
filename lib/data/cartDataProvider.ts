import { Cart } from "../types/api";
import { getVercelStoreData } from "./vercelApiConnector";

export const createCart = (): Promise<Cart | null> => {
    return getVercelStoreData<Cart>("cart/create", {}, "POST");
}

export const getCart = (token: string): Promise<Cart | null> => {
    return getVercelStoreData<Cart>("cart", {}, "GET", { "x-cart-token": token });
}

export const addToCart = (token: string, productId: string, quantity: number): Promise<Cart | null> => {
    return getVercelStoreData<Cart>(
        "cart",
        { productId, quantity: quantity },
        "POST",
        { "x-cart-token": token }
    );
}

export const updateItemQuantity = (
    token: string,
    productId: string,
    quantity: number
) => {
    const endpoint = `cart/${encodeURIComponent(productId)}`;
    return getVercelStoreData<Cart>(
        endpoint,
        { quantity },
        "PATCH",
        { "x-cart-token": token }
    );

};

export const removeItemFromCart = (token: string, productId: string) => {
    const endpoint = `cart/${encodeURIComponent(productId)}`;
    return getVercelStoreData<Cart>(endpoint, {}, "DELETE", {
        "x-cart-token": token,
    });
};

