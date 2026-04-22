import { getProduct, searchProducts } from "@/lib/data/productDataProvider";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/feature/ProductDetail";

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const products = await searchProducts({});
    if (!products) {
        return [];
    }
    return products.data.map(product => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params
    const product = await getProduct(slug);

    if (!product) {
        return null;
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.images.map(imgUrl => ({ url: imgUrl })),
        },
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    return <ProductDetail product={product} />
}