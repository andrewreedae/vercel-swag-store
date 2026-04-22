import SearchFeature from "@/components/feature/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Search',
    description: 'All sorts of products to choose from, and they all have a triangle on them.',
}

type SearchPageProps = {
    searchParams: Promise<{ search?: string; category?: string }>;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
    return <SearchFeature params={searchParams} noResultsText="No search results.  Please try again.  Sorry." />
}
