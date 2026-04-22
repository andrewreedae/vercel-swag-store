import Image from "next/image";
import styles from "./Header.module.scss";
import Link from "next/link";
import Cart from "./Cart";

type HeaderProps = {
    logo: string;
    links: {
        label: string;
        href: string;
    }[];
}

export default function Header(props: HeaderProps) {
    const { logo, links } = props;
    return (
        <div className={styles.header}>
            <div className={styles.headerContentWrapper}>
                <div className={styles.leftWrapper}>
                    <Link href="/">
                        <div className={styles.logo}>
                            <Image src={logo} alt="Logo" height={40} width={40} />
                        </div>
                    </Link>

                    <ul className={styles.menu}>
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cart">
                    <Cart />
                </div>
            </div>
        </div>
    )
}
