import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedProducts.module.scss";

export type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  price: string;
  image: string;
};

export function ProductCard(props: ProductCardProps) {
  const { slug, name, price, image } = props;
  const hasImage = image.length > 0;

  return (
    <article className={styles.productCard}>
      <Link
        href={`/products/${slug}`}
        className={styles.productCardLink}
      >
        <div className={styles.productCardImageWrap}>
          {hasImage ? (
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 800px) 50vw, (max-width: 1000px) 33vw, 16vw"
            />
          ) : (
            <div className={styles.productCardImagePlaceholder} />
          )}
        </div>
        <div className={styles.productCardBody}>
          <h3 className={styles.productCardName}>{name}</h3>
          <p className={styles.productCardPrice}>{price}</p>
        </div>
      </Link>
    </article>
  );
}
