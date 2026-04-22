import { Hero } from "../common/Hero";

export type HeroProps = {
    title: string;
    description: string;
    image: string;
    ctaText?: string;
    ctaLink?: string;
}

export default function HeroFeature(props: HeroProps) {
    return <Hero {...props} />

}