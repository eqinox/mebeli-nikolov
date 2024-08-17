"use client"
import React from 'react';
import styles from './page.module.css';
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import useImageSize from '../hooks/useImageSize';
import Image from 'next/image';

const Contacts = () => {
    const leftSidePartners = [
        { src: '/partners/orma.png', alt: 'orma', id: 11 },
        { src: '/partners/glunz.png', alt: 'glunz', id: 12 },
        { src: '/partners/fundermax.png', alt: 'fundermax', id: 13 },
        { src: '/partners/kastamonu.png', alt: 'kastamonu', id: 14 },
        { src: '/partners/thermopal.png', alt: 'thermopal', id: 15 },
    ]

    const rightSidePartners = [
        { src: '/partners/kronospan.png', alt: 'kronospan', id: 16 },
        { src: '/partners/duropal.png', alt: 'duropal', id: 17 },
        { src: '/partners/akritas2.png', alt: 'akritas', id: 18 },
        { src: '/partners/getalit.jpg', alt: 'getalit', id: 19 },
        { src: '/partners/wodego2.png', alt: 'wodego', id: 20 },
        { src: '/partners/Egger.png', alt: 'egger', id: 21 },
    ]

    return <div className={styles.mainParent}>
        <div className={styles.leftSide}>
            {leftSidePartners.map((image) => <div
                key={image.id}
                className={styles.partner}
                style={{ marginBottom: '30px' }}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>)}
        </div>

        <div className={styles.container}>
            <h2>Контакти</h2>

            <div className={styles.icons}>
                <IoLocationSharp size={40} />
            </div>
            <p>
                София - Бусманци
            </p>

            <div className={styles.icons}>
                <MdOutlinePhoneIphone size={40} />
            </div>

            <p style={{ marginBottom: '5px' }}> 0876 43 44 64 </p>
            <p style={{ marginTop: '5px', marginBottom: '5px' }}> 0899 43 44 61 </p>
            <p style={{ marginTop: '5px' }}> Григор Николов </p>

            <div className={styles.icons}>
                <IoMailOutline size={40} />
            </div>

            <p style={{ marginBottom: '60px' }}>
                <a style={{ color: 'white', textDecoration: 'none' }} href="mailto:multistrati@abv.bg">multistrati@abv.bg</a>
            </p>

        </div>

        <div className={styles.rightSide}>
            {rightSidePartners.map((image) => <div
                key={image.id}
                className={styles.partner}
                style={{ marginBottom: '30px' }}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>)}
        </div>
    </div>;
};


export default Contacts;
