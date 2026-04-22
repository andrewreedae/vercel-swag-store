import { NextResponse } from "next/server";
import {
  searchProducts,
  type SearchProductsParams,
} from "@/lib/data/productDataProvider";

function validateParams(searchParams: URLSearchParams): SearchProductsParams {
  const ret: SearchProductsParams = {};

  const search = searchParams.get("search");
  if (search && search.length >= 3) {
    ret.search = search;
  }

  const category = searchParams.get("category");
  if (category) {
    ret.category = category;
  }

  ret.featured = searchParams.get("featured") == "true";


  // TODO: paging?

  return ret;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = validateParams(searchParams);

  const result = await searchProducts(params);
  if (!result) {
    return NextResponse.json(
      { error: "Search products returned error" },
      { status: 500 }
    );
  }
  return NextResponse.json(result);
}

