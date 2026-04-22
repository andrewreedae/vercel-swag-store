import Image from "next/image";
import styles from "./ProductDetail.module.scss";
import AddToCartButton from "./AddToCartButton";
import { Suspense, use } from "react";

export type ProductDetailProps = {
    productId: string;
    image: string;
    name: string;
    price: string;
    description: string;
    stockPromise: Promise<number>;
}

export default function ProductDetail(props: ProductDetailProps) {
    const { productId, image, name, price, description, stockPromise } = props;

    return (
        <div className={styles.productDetail}>

            <div className={styles.imageWrapper}>
                <Image src={image} alt={name} width={500} height={500} />
            </div>
            <div className={styles.contentWrapper}>
                <h1 className={styles.productName}>{name}</h1>
                <p>{description}</p>
                <p>{price}</p>
                <Suspense fallback={<StockDisplayFallback productId={productId} />}>
                    <StockDisplay productId={productId} stockPromise={stockPromise} />
                </Suspense>
            </div>
        </div>
    )
}

function StockDisplay(props: { productId: string, stockPromise: Promise<number> }) {
    const { productId, stockPromise } = props;
    const stock = use(stockPromise);
    return <>
        <p>{stock} in stock </p>
        <AddToCartButton productId={productId} disabled={stock === 0} />
    </>
}

function StockDisplayFallback(props: { productId: string }) {
    const { productId } = props;
    return <>
        <p>Loading availability... </p>
        <AddToCartButton productId={productId} disabled />
    </>
}