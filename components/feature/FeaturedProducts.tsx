import { getFeaturedProducts } from "@/lib/data/productDataProvider";
import FeaturedProducts from "../common/FeaturedProducts";
import { formatCurrency } from "@/lib/util";

export type FeaturedProductsProps = {
    title: string;
    ctaText: string;
    ctaLink: string;
}


export default async function FeaturedProductsFeature(props: FeaturedProductsProps) {
    const { title, ctaText, ctaLink } = props;
    const products = await getFeaturedProducts();
    if (!products) { return <></>; }

    const productList = products.slice(0, 6).map((product) => ({
        id: product.id,
        name: product.name,
        price: formatCurrency(product.price, product.currency),
        image: product.images[0] ?? "",
        slug: product.slug,
    }));

    return (
        <FeaturedProducts
            title={title}
            ctaText={ctaText}
            ctaLink={ctaLink}
            products={productList}
        />
    )
}