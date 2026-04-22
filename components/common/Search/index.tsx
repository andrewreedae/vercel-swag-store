"use client";

import Image from "next/image";
import Link from "next/link";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type SubmitEventHandler,
} from "react";
import type { ApiData, Category, Product } from "@/lib/types/api";
import styles from "./Search.module.scss";

const SEARCH_DEBOUNCE_MS = 400;

function buildQueryString(search?: string, category?: string): string {
    const sp = new URLSearchParams();
    if (search) {
        sp.set("search", search);
    }
    if (category) {
        sp.set("category", category);
    }
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
}

type SearchProps = {
    categories: Category[];
    initialResults: ApiData<Product[]> | null;
    initialSearch?: string;
    initialCategory?: string;
    noResultsText: string;

};

export default function Search({
    categories,
    initialResults,
    initialSearch = "",
    initialCategory = "",
    noResultsText
}: SearchProps) {

    const [searchResults, setSearchResults] = useState<Product[]>(
        initialResults?.data ?? []
    );
    const [isLoading, setIsLoading] = useState(false);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const categorySelectRef = useRef<HTMLSelectElement>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fetchAbortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            fetchAbortRef.current?.abort();
        };
    }, []);

    const executeSearch = useCallback((search?: string, category?: string) => {
        fetchAbortRef.current?.abort();
        const abortController = new AbortController();
        fetchAbortRef.current = abortController;

        const qs = buildQueryString(search, category);
        window.history.replaceState(null, "", `/search${qs}`);
        setIsLoading(true);

        fetch(`/api/search${qs}`, {
            credentials: "same-origin",
            signal: abortController.signal,
        })
            .then((res) => {
                if (!res.ok) {
                    setSearchResults([]);
                    return;
                }
                return res.json() as Promise<ApiData<Product[]>>;
            })
            .then((json) => {
                if (json?.data && Array.isArray(json.data)) {
                    setSearchResults(json.data);
                } else {
                    setSearchResults([]);
                }
            })
            .catch(() => {
                if (!abortController.signal.aborted) setSearchResults([]);
            })
            .finally(() => {
                if (!abortController.signal.aborted) setIsLoading(false);
            });
    }, []);

    const clearDebounce = () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = null;
        }
    };

    const handleSearchInputChange = () => {
        clearDebounce();

        debounceTimerRef.current = setTimeout(() => {
            debounceTimerRef.current = null;
            executeSearch(searchInputRef.current?.value, categorySelectRef.current?.value);
        }, SEARCH_DEBOUNCE_MS);
    };

    const handleCategoryChange = (value: string) => {
        clearDebounce();
        executeSearch(searchInputRef.current?.value, value);
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        clearDebounce();
        executeSearch(searchInputRef.current?.value, categorySelectRef.current?.value);
    };

    return (
        <div className={styles.searchContainer}>
            <form className={styles.searchHeader} onSubmit={handleSubmit}>
                <input
                    ref={searchInputRef}
                    type="text"
                    name="search"
                    defaultValue={initialSearch}
                    onChange={handleSearchInputChange}
                />
                <select
                    ref={categorySelectRef}
                    name="category"
                    defaultValue={initialCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    <option value="">All categories</option>
                    {categories && categories.map((opt) => (
                        <option key={opt.slug} value={opt.slug}>
                            {opt.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Search</button>
            </form>

            <div className={styles.searchResults}>
                {isLoading && (
                    <div className={styles.searchResultsLoading}>
                        Searching...
                    </div>
                )}
                <div
                    className={
                        isLoading ? styles.searchResultsInnerDimmed : styles.searchResultsInner
                    }
                >
                    {!isLoading && searchResults.length === 0 && (
                        <p className={styles.searchNoResults}>{noResultsText}</p>
                    )}
                    {searchResults.length > 0 && (
                        <ul className={styles.searchResultList}>
                            {searchResults.map((result) => (
                                <li key={result.id} className={styles.searchResultItem}>
                                    <Link
                                        href={`/products/${result.slug}`}
                                        className={styles.searchResultLink}
                                    >
                                        <div className={styles.searchResultThumb}>
                                            {result.images?.[0] ? (
                                                <Image
                                                    src={result.images[0]}
                                                    alt={result.name}
                                                    width={72}
                                                    height={72}
                                                />
                                            ) : (
                                                <div className={styles.searchResultThumbPlaceholder} />
                                            )}
                                        </div>
                                        <span className={styles.searchResultName}>{result.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
