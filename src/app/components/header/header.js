"use client"
import { IoMdMenu } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";

import styles from "./header.module.css";
import Navbar from "./navbar";
import LowResolutionNavbar from "./lowResolutionNavbar";
import Button from "../UI/button";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    const headingItems = [
        { title: 'Начало', route: '/' },
        { title: 'За нас', route: 'about-us' },
        { title: 'Галерия', route: 'gallery' },
        { title: 'Контакти', route: 'contacts' }
    ];

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleMenuDropdown = (value) => {
        if (value === false) {
            setShowDropdown(value);
        } else {
            setShowDropdown(!showDropdown);
        }
    };

    return (
        <header
            className={styles.header}
            style={{
                backgroundImage: 'url(/congruent_outline.png)',
                margin: '0px'
            }}
        >
            <div
                className={styles.logoDiv}
                onClick={() => { router.push('/') }}
            >
                <Image
                    src="/bigger-logo.png"
                    alt="Logo"
                    width={266}
                    height={70}
                />
            </div>
            <Navbar
                headingItems={headingItems}
            />

            <LowResolutionNavbar
                showDropdown={showDropdown}
                toggleMenuDropdown={toggleMenuDropdown}
                headingItems={headingItems}
            />

            <Button
                onClick={() => toggleMenuDropdown()}
                className={styles["menu-icon"]}
            >
                <IoMdMenu size={45} />
            </Button>
        </header>
    )
}

export default Header;