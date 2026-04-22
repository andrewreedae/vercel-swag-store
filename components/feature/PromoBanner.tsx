import { getPromoBanner } from "@/lib/data/productDataProvider";
import PromoBanner, { PromoBannerLoader } from "@/components/common/PromoBanner";
import { Suspense } from "react";


export default function PromoBannerFeature() {
    const promoBannerPromise = getPromoBanner();

    return <Suspense fallback={<PromoBannerLoader />}>
        <PromoBanner bannerPromise={promoBannerPromise} />
    </Suspense>;
}