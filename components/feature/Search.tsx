import { Suspense } from "react";
import SearchLoading from "../common/Search/SearchLoading";
import Search from "../common/Search";

import {
  getCategories,
  searchProducts,
} from "@/lib/data/productDataProvider";

export type SearchFeatureProps = {
  params: Promise<{ search?: string; category?: string }>;
  noResultsText: string;
};

export default function SearchFeature({
  params, noResultsText
}: SearchFeatureProps) {

  const SuspendedSearch = async () => {
    const { search, category } = await params;
    const categoryPromise = getCategories();
    const resultsPromise = searchProducts({ search, category });
    const [categories, results] = await Promise.all([
      categoryPromise,
      resultsPromise,
    ]);
    return <Search
      categories={categories ?? []}
      initialResults={results}
      initialSearch={search ?? ""}
      initialCategory={category ?? ""}
      noResultsText={noResultsText}
    />;
  }

  return (
    <Suspense fallback={<SearchLoading />}>
      <SuspendedSearch />
    </Suspense>
  );
}
