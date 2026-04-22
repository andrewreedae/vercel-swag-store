import { cacheLife } from "next/cache";
import { ApiData, Category, Product, ProductStock, PromoBanner } from "../types/api";
import { getVercelStoreData, getVercelStoreDataWithMeta } from "./vercelApiConnector";

export const getPromoBanner = async () => {
    const data = await getVercelStoreData<PromoBanner>("promotions");
    // The API isn't returning any promos for 2026, so we're not going to check the dates
    //     && new Date(data.validFrom) < new Date() && new Date(data.validUntil) > new Date()
    if (data && data.active) {
        return data;
    }
    return null;
}

export const getFeaturedProducts = async () => {
    "use cache"
    cacheLife('featuredProducts');
    const data = await getVercelStoreData<Product[]>("products", { featured: "true" });
    return data;
}

export const getProduct = async (slugOrId: string) => {
    "use cache"
    cacheLife('products');
    const data = await getVercelStoreData<Product>(`products/${slugOrId}`);
    return data;
}

export const getProductStock = async (slugOrId: string) => {
    const data = await getVercelStoreData<ProductStock>(`products/${slugOrId}/stock`);
    return data?.stock ?? 0;
}

export const getCategories = async () => {
    "use cache"
    cacheLife('categories');
    const data = await getVercelStoreData<Category[]>("categories");
    return data;
}

export type SearchProductsParams = {
    search?: string;
    category?: string | null;
    featured?: boolean;
    page?: number;
    limit?: number;
};

export const searchProducts = async (
    params: SearchProductsParams | null
): Promise<ApiData<Product[]> | null> => {
    const query = params ? (Object.keys(params) as Array<keyof SearchProductsParams>).reduce((acc, key) => {
        if (params[key]) acc[key] = String(params[key]);
        return acc;
    }, {} as Record<string, string>) : {};

    if (params?.search) {
        return searchProductsUncached(query);
    } else {
        return searchProductsCached(query);
    }
}

const searchProductsCached = async (query: Record<string, string>) => {
    "use cache"
    cacheLife('search');
    return getVercelStoreDataWithMeta<Product[]>("products", query, "GET");
}

const searchProductsUncached = async (query: Record<string, string>) => {
    return getVercelStoreDataWithMeta<Product[]>("products", query, "GET");
}
