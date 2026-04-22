import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.scss";

type HeroProps = {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    ctaText?: string;
    ctaLink?: string;
};

export function Hero(props: HeroProps) {
    const { title, description, image, imageAlt, ctaText, ctaLink } = props;
    const hasImage = image.length > 0;

    return (
        <div className={styles.hero}>
            <div className={styles.heroImage}>
                {hasImage ? (
                    <Image
                        src={image}
                        alt={imageAlt ?? ""}
                        fill
                        priority
                        sizes="(max-width: 800px) 100vw, 52vw"
                        fetchPriority="high"
                    />
                ) : null}
            </div>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                    {title}
                </h1>
                <p className={styles.heroDescription}>{description}</p>
                {ctaText && ctaLink ? (
                    <Link href={ctaLink} className={styles.heroCta}>
                        {ctaText}
                    </Link>
                ) : null}
            </div>
        </div>
    );
}
