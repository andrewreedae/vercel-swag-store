"use client"

import { useCart } from "@/components/context/cart/CartContext";
import styles from "./ProductDetail.module.scss";

export type AddToCartButtonProps = {
    productId: string;
    disabled: boolean;
}

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { productId, disabled } = props;
    const { addItem, isPending } = useCart();
    const handleAddToCart = () => {
        addItem(productId);
    }
    return <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={isPending || disabled}>Add to Cart </button>
}
