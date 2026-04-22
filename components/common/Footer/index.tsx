import { cacheLife } from "next/cache";
import styles from "./Footer.module.scss";

export default async function Footer() {
    "use cache"
    cacheLife("days");

    return (
        <div className={styles.footer}>
            <div className={styles.footerContentWrapper}>
                <div className="copyright">
                    <p>Copyright © <span suppressHydrationWarning>{new Date().getFullYear()}</span> - All rights reserved</p>
                </div>
            </div>
        </div>
    )
}
