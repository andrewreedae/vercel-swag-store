import styles from "./PromoBanner.module.scss";

export type PromoBannerProps = {
    bannerPromise: Promise<{
        title: string;
        description: string;
        discountPercent: number;
        code: string;
    } | null>
}

export default async function PromoBanner(props: PromoBannerProps) {
    const banner = await props.bannerPromise;
    if (!banner) { return <></>; }
    const { title, description, discountPercent, code } = banner;

    return (
        <div className={styles.promoBanner}>
            {title} -- {description}  Use code: <strong>{code}</strong> for {discountPercent}% off
        </div>

    )
}

export function PromoBannerLoader() {
    return (
        <div className={styles.promoBanner} />
    )
}