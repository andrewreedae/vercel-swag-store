import Link from "next/link";
import { ProductCard, ProductCardProps } from "./ProductCard";
import styles from "./FeaturedProducts.module.scss";

export type FeaturedProductsProps = {
    title: string;
    ctaText: string;
    ctaLink: string;
    products: ProductCardProps[];
}

export default function FeaturedProducts(props: FeaturedProductsProps) {
    const { title, ctaText, ctaLink, products } = props;
    return (
        <div className={styles.featuredProducts} >
            <div className={styles.featuredProductsHeader}>
                <h2>{title}</h2>
                <div className={styles.featuredProductsCta}>
                    <Link href={ctaLink}> {ctaText} </Link>
                </div>
            </div>
            <div className={styles.featuredProductsList}>
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    )
}