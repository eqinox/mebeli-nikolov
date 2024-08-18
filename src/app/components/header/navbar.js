"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./navbar.module.css";

const Navbar = ({ className, headingItems }) => {
    const pathname = usePathname()
    const url = pathname.replace(/\/(.+)/, '$1');
    
    return (
        <nav className={styles.links + ` ${className}`}>
            <ul>
                {headingItems.map((item, index) =>
                    <li key={index}>
                        <Link
                            className={`${styles.navLink} ${item.route === url ? styles.selected : undefined}`}
                            href={item.route}
                        >
                            {item.title}
                        </Link>
                    </li>)}
            </ul>
        </nav>
    )
}

export default Navbar;