import { Product } from "@/lib/types/api";
import ProductDetail from "@/components/common/ProductDetail";
import { getProductStock } from "@/lib/data/productDataProvider";
import { formatCurrency } from "@/lib/util";



export default function ProductDetailFeature(props: { product: Product }) {
    const { product } = props;

    const stockPromise = getProductStock(product.id);

    return <ProductDetail
        productId={product.id}
        image={product.images.length > 0 ? product.images[0] : ""}
        name={product.name}
        price={formatCurrency(product.price, product.currency)}
        description={product.description}
        stockPromise={stockPromise}
    />
}

