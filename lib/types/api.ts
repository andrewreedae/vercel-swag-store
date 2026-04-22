export type ApiData<T> = {
    data: T;
    meta: ApiDataMeta;
    success: boolean;
}

export type ApiDataMeta = {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }
}

export type PromoBanner = {
    id: string;
    title: string;
    description: string;
    discountPercent: number;
    code: string;
    validFrom: string;
    validUntil: string;
    active: boolean;
}

export type Product = {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    images: string[];
    featured: boolean;
    tags: string[];
    createdAt: string;
}

export type ProductStock = {
    productId: string;
    stock: number;
    inStock: boolean;
    lowStock: boolean;
}


export type Category = {
    name: string;
    slug: string;
    productCount: number;
}

export type Cart = {
    token: string;
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    currency: string;
    createdAt: string;
    updatedAt: string;
}

export type CartItem = {
    addedAt: string;
    lineTotal: number;
    product: Product;
    productId: string;
    quantity: number;
}




