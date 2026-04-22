import Header from "../common/Header";


type HeaderProps = {
    logo: string;
    links: {
        label: string;
        href: string;
    }[];
}

export default function HeaderFeature(props: HeaderProps) {
    const { logo, links } = props;
    return (
        <Header logo={logo} links={links} />
    )
}