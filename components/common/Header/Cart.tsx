"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/context/cart/CartContext";
import { formatCurrency } from "@/lib/util";
import { CartItem } from "@/lib/types/api";
import styles from "./Header.module.scss";


type CartLineItemProps = {
    item: CartItem;
    currency: string;
    onRemove: (productId: string) => void;
    onUpdateQuantity: (productId: string, quantity: number) => void;
}

function CartLineItem(props: CartLineItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const editQuantityRef = useRef<HTMLInputElement>(null);
    const {
        item,
        currency,
        onRemove,
        onUpdateQuantity,
    } = props;

    if (!item || !item.product) return <></>;
    const imageSrc = item.product.images?.[0];
    const name = item.product.name;

    const handleEditQuantity = async () => {
        await onUpdateQuantity(item.productId, Number(editQuantityRef.current?.value));
        setIsEditing(false);
    };

    return (
        <div className={styles.cartDropdownItem}>
            {imageSrc ? (
                <div className={styles.cartDropdownItemImage}>
                    <Image src={imageSrc} alt={name} width={48} height={48} />
                </div>
            ) : (
                <div className={styles.cartDropdownItemImagePlaceholder} />
            )}
            <div className={styles.cartDropdownItemDetails}>
                <span className={styles.cartDropdownItemName}>{name}</span>
                <div className={styles.cartQtyRow}>
                    <span className={styles.cartDropdownItemPrice}>
                        {formatCurrency(item.product?.price ?? 0, currency)} ×{" "}
                    </span>
                    {isEditing ? (
                        <>
                            <input
                                ref={editQuantityRef}
                                type="number"
                                min={0}
                                className={styles.cartQtyInput}
                                defaultValue={item.quantity}
                            />
                            <button
                                type="button"
                                className={styles.cartQtySave}
                                onClick={handleEditQuantity}
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <span className={styles.cartQtyValue}>{item.quantity}</span>
                            <button
                                type="button"
                                className={styles.cartQtyEdit}
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
                <span className={styles.cartDropdownItemLineTotal}>
                    {formatCurrency(item.lineTotal, currency)}
                </span>
            </div>
            <button
                type="button"
                className={styles.cartRemoveLine}
                onClick={() => onRemove(item.productId)}
            >
                ×
            </button>
        </div>
    );
}

export default function Cart() {
    const { cart, isPending, removeItem, updateItemQuantity } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
            return () => document.removeEventListener("click", handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div className={styles.cartWrapper} ref={containerRef}>
            <button
                type="button"
                className={styles.cartButton}
                onClick={() => setIsOpen((prev) => !prev)}
                disabled={cart == null || isPending}
            >
                {isPending ? <span className={styles.cartSpinner}></span> :
                    <>Cart ({cart.loadingStatus == "unloaded" ? <>&nbsp;</> : cart.totalItems})</>
                }
            </button>
            {isOpen && !isPending && (
                <div className={styles.cartDropdown}>
                    <div className={styles.cartDropdownItems}>
                        {cart.items.length === 0 ? (
                            <p className={styles.cartDropdownEmpty}>Your cart is empty.</p>
                        ) : (
                            cart.items.map((item, idx) => (
                                <CartLineItem
                                    key={idx}
                                    item={item}
                                    currency={cart.currency}
                                    onRemove={removeItem}
                                    onUpdateQuantity={updateItemQuantity}
                                />
                            ))
                        )}
                    </div>
                    {cart.items.length > 0 && (
                        <div className={styles.cartDropdownSubtotal}>
                            <span>Subtotal</span>
                            <span>{formatCurrency(cart.subtotal, cart.currency)}</span>
                        </div>
                    )}
                </div>
            )}
        </div>

    );
}
